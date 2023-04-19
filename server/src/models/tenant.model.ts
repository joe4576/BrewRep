import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const tenantValidator = z.object({
  id: uuidValidator.optional(),
  name: z.string(),
  dateCreated: z.date(),
});

export type Tenant = z.infer<typeof tenantValidator>;
