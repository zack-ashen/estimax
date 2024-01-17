import { relations } from 'drizzle-orm';
import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';
import { projects } from './projects.schema';
import { properties } from './properties.schema';
import { propertyManagers } from './propertyManagers.schema';

export const organizations = pgTable(
  'organizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cuid: varchar('clerkId', { length: 255 }).notNull(),
    logo: varchar('logo', { length: 255 }),
    name: varchar('name', { length: 255 }).notNull(),
    website: varchar('website', { length: 255 }),
  },
  (organizations) => {
    return {
      orgCuidIdx: uniqueIndex('orgCuidIdx').on(organizations.cuid),
    };
  }
);

export const organizationsRelations = relations(organizations, ({ many }) => ({
  propertyManagers: many(propertyManagers),
  properties: many(properties),
  projects: many(projects),
}));

export type SelectOrganization = InferSelectModel<typeof organizations>;
export type InsertOrganization = InferInsertModel<typeof organizations>;
