import { ProjectStatus } from '@/types';
import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';
import { bids } from './bids.schema';
import { projectMedia } from './joinTables/projectMedia.schema';
import { organizations } from './organization.schema';
import { properties } from './properties.schema';

export const projectStatus = pgEnum(
  'projectStatus',
  Object.values(ProjectStatus) as [string, ...string[]]
);

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  expirationDate: timestamp('expirationDate', { withTimezone: true }).notNull(),
  allowDynamicBidding: boolean('allowDynamicBidding').notNull().default(false),
  isPublic: boolean('isPublic').notNull().default(false),
  description: text('description').notNull(),
  status: projectStatus('status').notNull().default(ProjectStatus.IN_PROGRESS),
  organization: uuid('organization')
    .notNull()
    .references(() => organizations.id),
  property: uuid('property')
    .notNull()
    .references(() => properties.id),
});

export const projectsRelations = relations(projects, ({ many, one }) => ({
  property: one(properties, {
    fields: [projects.property],
    references: [properties.id],
  }),
  organization: one(organizations, {
    fields: [projects.organization],
    references: [organizations.id],
  }),
  bids: many(bids),
  media: many(projectMedia),
}));

export type SelectProject = InferSelectModel<typeof projects>;
export type InsertProject = InferInsertModel<typeof projects>;
