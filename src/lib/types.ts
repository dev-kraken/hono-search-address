import { OpenAPIHono, RouteConfig, RouteHandler, z } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export const selectSearchSchemaCustom = z.array(
  z.object({
    delivery_city: z.string().nullable(),
    delivery_state_abbr: z.string().nullable(),
    delivery_zip: z.string().nullable(),
  }),
);
