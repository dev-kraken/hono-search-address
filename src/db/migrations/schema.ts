import { pgTable, integer, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const searchZip = pgTable("search_zip", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "search_zip_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	deliveryZip: varchar("delivery_zip"),
	deliveryCity: varchar("delivery_city"),
	deliveryStateAbbr: varchar("delivery_state_abbr"),
});
