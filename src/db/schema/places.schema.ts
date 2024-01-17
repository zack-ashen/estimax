import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { doublePrecision, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const places = pgTable('places', {
  id: uuid('id').primaryKey().defaultRandom(),
  neLat: doublePrecision('neLat').notNull(),
  neLong: doublePrecision('neLong').notNull(),
  swLat: doublePrecision('swLat').notNull(),
  swLong: doublePrecision('swLong').notNull(),
  placeId: varchar('placeId', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type SelectPlace = InferSelectModel<typeof places>;
export type InsertPlace = InferInsertModel<typeof places>;
