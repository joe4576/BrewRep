import { z } from "zod";

export const uuidValidator = z.string().uuid();
