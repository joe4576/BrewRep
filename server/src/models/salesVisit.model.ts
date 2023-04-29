import { z } from "zod";
import {
  optionalUuidValidator,
  uuidValidator,
} from "./validators/commonValidators";

export const salesVisitValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  outletId: uuidValidator,
  salesJourneyId: optionalUuidValidator,
});

export type SalesVisit = z.infer<typeof salesVisitValidator>;
