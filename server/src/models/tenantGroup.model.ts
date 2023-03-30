import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const tenantGroupValidator = z.object({
  id: uuidValidator,
  name: z.string(),
  ownerId: uuidValidator,
});

export type TenantGroup = z.infer<typeof tenantGroupValidator>;
