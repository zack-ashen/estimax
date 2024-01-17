import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { vendorServices } from './joinTables/vendorServices.schema';

export const services = pgTable('services', {
  id: uuid('id').primaryKey(),
  service: varchar('service', { length: 255 }).notNull(),
});

export const servicesRelations = relations(services, ({ many }) => ({
  vendors: many(vendorServices),
}));
