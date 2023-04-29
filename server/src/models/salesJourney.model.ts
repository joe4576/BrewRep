import { z } from "zod";
import { uuidValidator } from "./validators/commonValidators";

export const salesJourneyValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  assignedUserId: uuidValidator,
  date: z.date(),
  startMilage: z.number().default(0),
  endMilage: z.number().default(0),
  completed: z.boolean(),
  inProgress: z.boolean(),
});

export type SalesJourney = z.infer<typeof salesJourneyValidator>;
