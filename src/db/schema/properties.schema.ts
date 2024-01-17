import { PropertyTypes } from '@/types/property.types';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';
import { addresses } from './addresses.schema';
import { propertyMedia } from './joinTables/propertyMedia.schema';
import { organizations } from './organization.schema';
import { projects } from './projects.schema';

export const propertyType = pgEnum(
  'type',
  Object.values(PropertyTypes) as [string, ...string[]]
);

export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }).notNull(),
  type: propertyType('type').notNull(),
  description: text('description'),
  organization: uuid('organization')
    .references(() => organizations.id)
    .notNull(),
  address: uuid('address')
    .references(() => addresses.id)
    .notNull(),
});

export const propertiesRelations = relations(properties, ({ many, one }) => ({
  projects: many(projects),
  media: many(propertyMedia),
  address: one(addresses, {
    fields: [properties.address],
    references: [addresses.id],
  }),
  organization: one(organizations, {
    fields: [properties.organization],
    references: [organizations.id],
  }),
}));

export type SelectProperty = InferSelectModel<typeof properties>;
export type InsertProperty = InferInsertModel<typeof properties>;
