import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { media, properties } from '..';

export const propertyMedia = pgTable('propertyMedia', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId').references(() => properties.id),
  mediaId: uuid('mediaId').references(() => media.id),
});

export const propertyMediaRelations = relations(propertyMedia, ({ one }) => ({
  property: one(properties, {
    fields: [propertyMedia.propertyId],
    references: [properties.id],
  }),
  media: one(media, {
    fields: [propertyMedia.mediaId],
    references: [media.id],
  }),
}));
