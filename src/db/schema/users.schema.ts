import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';

export const roles = pgEnum('role', ['propertyManager', 'vendor']);

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cuid: varchar('cuid', { length: 255 }).notNull(),
    firstName: varchar('firstName', { length: 60 }).notNull(),
    lastName: varchar('lastName', { length: 60 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phoneNumber: varchar('phoneNumber', { length: 15 }).notNull(),
    phoneNumberVerified: boolean('phoneNumberVerified').$default(() => false),
    profilePhoto: varchar('profilePhoto', { length: 255 }),
    role: roles('role').notNull(),
  },
  (users) => {
    return {
      usersCuidIdx: uniqueIndex('usersCuidIdx').on(users.cuid),
    };
  }
);

export const usersRelations = relations(users, ({ one }) => ({
  propertyManager: one(users),
}));

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
