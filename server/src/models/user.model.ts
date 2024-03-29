import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const userValidator = z.object({
  id: uuidValidator.optional(),
  name: z.string(),
  isAdmin: z.boolean().optional(),
  uid: z.string(),
});

export type User = z.infer<typeof userValidator>;
