import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm/table";

export const bids = pgTable("bids", {
  id: uuid("id").primaryKey().defaultRandom(),
  amount: numeric("amount", { precision: 11, scale: 2 }).notNull(),
  description: text("description").notNull(),
});

export type Bids = InferSelectModel<typeof bids>;
export type InsertBids = InferInsertModel<typeof bids>;
