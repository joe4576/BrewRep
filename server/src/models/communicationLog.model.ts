import { z } from "zod";
import {
  optionalUuidValidator,
  uuidValidator,
} from "./validators/commonValidators";

export const communicationLogValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  description: z.string(),
  salesVisitId: optionalUuidValidator,
  authorId: uuidValidator,
  outletId: uuidValidator,
  createdDate: z.date(),
});

export type CommunicationLog = z.infer<typeof communicationLogValidator>;
