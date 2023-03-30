import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const tenantValidator = z.object({
  id: uuidValidator,
  name: z.string(),
  tenantGroupId: uuidValidator,
  isDemo: z.boolean().default(false),
});

export type Tenant = z.infer<typeof tenantValidator>;
