import { pgTable, varchar } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const searchAddress = pgTable("search_zip", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  delivery_zip: varchar(),
  delivery_city: varchar(),
  delivery_state_abbr: varchar(),
});

export const selectSearchSchema = createSelectSchema(searchAddress);

export const insertSearchSchema = createInsertSchema(searchAddress, {
  delivery_zip: schema => schema.delivery_zip.min(1).max(5),
  delivery_city: schema => schema.delivery_city.min(1).max(200),
  delivery_state_abbr: schema => schema.delivery_state_abbr.min(1).max(2),
}).omit({
  id: true,
});

export const patchSearchSchema = insertSearchSchema.partial();
