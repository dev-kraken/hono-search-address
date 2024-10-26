import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { any, z } from "zod";

// Load and expand environment variables
expand(config());

// Define schema for environment variables with validation
const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),
  DATABASE_URL: z.string().url().or(any()), // Allow any type for flexibility
  DATABASE_AUTH_TOKEN: z.string().optional(),
});

// Infer the environment type from the schema
export type Env = z.infer<typeof EnvSchema>;

// Validate and parse the environment variables
// eslint-disable-next-line node/no-process-env
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid environment configuration:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;
