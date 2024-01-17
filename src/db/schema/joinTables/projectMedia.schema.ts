import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { media, properties } from '..';

export const projectMedia = pgTable('projectMedia', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('projectId').references(() => properties.id),
  mediaId: uuid('mediaId').references(() => media.id),
});

export const projectMediaRelations = relations(projectMedia, ({ one }) => ({
  property: one(properties, {
    fields: [projectMedia.projectId],
    references: [properties.id],
  }),
  media: one(media, {
    fields: [projectMedia.mediaId],
    references: [media.id],
  }),
}));
