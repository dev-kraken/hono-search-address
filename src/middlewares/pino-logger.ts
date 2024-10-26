import { logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import env from "@/env";

// Function to set up Pino logger middleware with configuration
export function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: env.LOG_LEVEL || "info",
      },
      env.NODE_ENV === "production" ? undefined : pretty(),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
