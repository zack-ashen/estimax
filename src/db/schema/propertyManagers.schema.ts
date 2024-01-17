import { relations } from 'drizzle-orm';
import { boolean, pgTable, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';
import { organizations } from './organization.schema';
import { users } from './users.schema';

export const propertyManagers = pgTable('propertyManagers', {
  id: uuid('id')
    .primaryKey()
    .references(() => users.id),
  isAdmin: boolean('isAdmin').notNull().default(true),
  organization: uuid('organization')
    .references(() => organizations.id)
    .notNull(),
});

export const propertyManagersRelations = relations(
  propertyManagers,
  ({ one }) => ({
    user: one(users, {
      fields: [propertyManagers.id],
      references: [users.id],
    }),
  })
);

export type SelectPropertyManager = InferSelectModel<typeof propertyManagers>;
export type InsertPropertyManager = InferInsertModel<typeof propertyManagers>;
