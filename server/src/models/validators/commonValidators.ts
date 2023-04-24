import { z } from "zod";

export const uuidValidator = z.string().uuid();

export const optionalUuidValidator = z.string().uuid().nullable().optional();
