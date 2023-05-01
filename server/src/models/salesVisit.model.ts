import { z } from "zod";
import {
  optionalUuidValidator,
  uuidValidator,
} from "./validators/commonValidators";

const salesVisitStatus = ["OPEN", "COMPLETE"] as const;

export const salesVisitValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  startTime: z.date(),
  endTime: z.date(),
  outletId: uuidValidator,
  salesJourneyId: optionalUuidValidator,
  status: z.enum(salesVisitStatus).default("OPEN"),
  reference: z.string(),
});

export type SalesVisit = z.infer<typeof salesVisitValidator>;
