import { relations } from 'drizzle-orm';
import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';
import { vendorServices } from './joinTables/vendorServices.schema';
import { places } from './places.schema';
import { users } from './users.schema';

export const vendors = pgTable('vendors', {
  id: uuid('id')
    .primaryKey()
    .references(() => users.id),
  searchRadius: integer('searchRadius').notNull().default(10),
  companyName: varchar('companyName', { length: 255 }).notNull(),
  companyDescription: text('companyDescription'),
  place: uuid('place')
    .notNull()
    .references(() => places.id),
});

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  user: one(users),
  services: many(vendorServices),
  place: one(places),
}));

export type SelectVendor = InferSelectModel<typeof vendors>;
export type InsertVendor = InferInsertModel<typeof vendors>;
