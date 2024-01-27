import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { media, projects } from '..';

export const projectMedia = pgTable('projectMedia', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('projectId').references(() => projects.id),
  mediaId: uuid('mediaId').references(() => media.id),
});

export const projectMediaRelations = relations(projectMedia, ({ one }) => ({
  project: one(projects, {
    fields: [projectMedia.projectId],
    references: [projects.id],
  }),
  media: one(media, {
    fields: [projectMedia.mediaId],
    references: [media.id],
  }),
}));
