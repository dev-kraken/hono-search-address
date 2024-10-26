import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import type { AppBindings } from "@/lib/types";

import { pinoLogger } from "@/middlewares/pino-logger";

// Function to create and configure the router with OpenAPI support
export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

// Function to create and configure the application
export default function createApp() {
  const app = createRouter();

  // Middleware for serving a custom emoji favicon
  app.use(serveEmojiFavicon("🕵"));

  // Middleware for logging requests with Pino logger
  app.use(pinoLogger());

  // Middleware for handling not found errors
  app.notFound(notFound);

  // Middleware for handling other errors
  app.onError(onError);

  return app;
}
