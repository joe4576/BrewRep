import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const brewmanLinkValidator = z.object({
  id: uuidValidator,
  tenantId: uuidValidator,
  brewmanApiKey: z.string(),
  brewmanTenantId: z.string(),
});

export type BrewmanLink = z.infer<typeof brewmanLinkValidator>;
