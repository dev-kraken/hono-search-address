CREATE TABLE IF NOT EXISTS "search_zip" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "search_zip_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"delivery_zip" varchar,
	"delivery_city" varchar,
	"delivery_state_abbr" varchar
);
