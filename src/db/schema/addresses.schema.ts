import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { decimal, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  lat: decimal('lat', { precision: 9, scale: 6 }).notNull(),
  long: decimal('long', { precision: 9, scale: 6 }).notNull(),
  placeId: varchar('placeId', { length: 255 }).notNull(),
  addressLine1: varchar('addressLine1', { length: 255 }).notNull(),
  addressLine2: varchar('addressLine2', { length: 255 }),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  zip: varchar('zip', { length: 255 }).notNull(),
});

export type InsertAddress = InferInsertModel<typeof addresses>;
export type SelectAddress = InferSelectModel<typeof addresses>;
