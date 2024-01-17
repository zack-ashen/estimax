import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { services } from '../services.schema';
import { vendors } from '../vendors.schema';

export const vendorServices = pgTable('vendorServices', {
  id: uuid('id').primaryKey().defaultRandom(),
  vendorId: uuid('vendorId').references(() => vendors.id),
  serviceId: uuid('serviceId').references(() => services.id),
});

export const vendorServicesRelations = relations(vendorServices, ({ one }) => ({
  vendor: one(vendors, {
    fields: [vendorServices.serviceId],
    references: [vendors.id],
  }),
  service: one(services, {
    fields: [vendorServices.serviceId],
    references: [services.id],
  }),
}));
