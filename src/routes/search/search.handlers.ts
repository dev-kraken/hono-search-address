import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";
import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
} from "@/routes/search/search.routes";

import db from "@/db";
import { searchAddress } from "@/db/schema";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const allAddress = await db.query.searchAddress.findMany();
  return c.json(allAddress);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const createAddress = c.req.valid("json");
  const [inserted] = await db
    .insert(searchAddress)
    .values(createAddress)
    .returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { search } = c.req.valid("param");
  const searchedAddress = await db.query.searchAddress.findMany({
    limit: 10,
    offset: 0,
    columns: {
      delivery_city: true,
      delivery_state_abbr: true,
      delivery_zip: true,
    },
    where(fields, operators) {
      return operators.or(
        operators.like(fields.delivery_zip, `${search}%`),
        operators.like(fields.delivery_city, `%${search.toUpperCase()}%`),
      );
    },
  });

  if (searchedAddress.length === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(searchedAddress, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  const [updateAddress] = await db
    .update(searchAddress)
    .set(updates)
    .where(eq(searchAddress.id, id))
    .returning();

  if (!updateAddress) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(updateAddress, HttpStatusCodes.OK);
};
