import type { Config } from "drizzle-kit";

import { defineConfig } from "drizzle-kit";

import env from "@/env";

// Define and export the configuration for Drizzle
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} as Config);
