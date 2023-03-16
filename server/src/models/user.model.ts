import { z } from "zod";

export const userValidator = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  isAdmin: z.boolean().optional(),
});

export type User = z.infer<typeof userValidator>;
