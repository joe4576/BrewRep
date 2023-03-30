import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const userValidator = z.object({
  id: uuidValidator,
  name: z.string(),
  isAdmin: z.boolean().optional().default(false),
  uid: z.string(),
});

export type User = z.infer<typeof userValidator>;
