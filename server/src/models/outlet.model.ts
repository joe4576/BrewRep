import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const outletValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  name: z.string(),
  code: z.string(),
  lat: z.string(),
  long: z.string(),
});

export type Outlet = z.infer<typeof outletValidator>;
