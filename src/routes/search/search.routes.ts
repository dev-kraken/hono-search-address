import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import {
  insertSearchSchema,
  patchSearchSchema,
  selectSearchSchema,
} from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";
import { selectSearchSchemaCustom } from "@/lib/types";

const tags = ["Address Search"];

const UserSchema = z.object({
  search: z.string().openapi({
    example: "New York",
  }),
});

export const list = createRoute({
  path: "/search",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectSearchSchema),
      "The list of Search Addresses",
    ),
  },
});

export const create = createRoute({
  path: "/search",
  method: "post",
  request: {
    body: jsonContentRequired(insertSearchSchema, "The Search to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSearchSchema,
      "The created Search Address",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertSearchSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/search/{search}",
  method: "get",
  request: {
    params: UserSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSearchSchemaCustom,
      "The requested search address",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Search Address not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(UserSchema),
      "Invalid search error",
    ),
  },
});

export const patch = createRoute({
  path: "/search/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchSearchSchema, "The search updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSearchSchema,
      "The updated search address",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Search Address not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchSearchSchema).or(
        createErrorSchema(IdParamsSchema),
      ),
      "The validation error(s)",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
