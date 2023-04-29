import { z } from "zod";
import {
  optionalUuidValidator,
  uuidValidator,
} from "./validators/commonValidators";

export const communicationLogValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  outletId: uuidValidator,
  log: z.string(),
  salesVisitId: optionalUuidValidator,
});

export type CommunicationLog = z.infer<typeof communicationLogValidator>;
