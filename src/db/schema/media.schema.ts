import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';
import { projectMedia } from './joinTables/projectMedia.schema';
import { propertyMedia } from './joinTables/propertyMedia.schema';

export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
});

export const mediaRelations = relations(media, ({ many }) => ({
  properties: many(propertyMedia),
  projects: many(projectMedia),
}));

export type Media = InferSelectModel<typeof media>;
export type InsertMedia = InferInsertModel<typeof media>;
