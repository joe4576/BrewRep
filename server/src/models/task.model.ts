import { z } from "zod";
import {
  optionalUuidValidator,
  uuidValidator,
} from "./validators/commonValidators";

export const taskValidator = z.object({
  tenantId: uuidValidator,
  id: uuidValidator,
  createdByUserId: uuidValidator,
  assignedToUserId: optionalUuidValidator,
  dateCreated: z.date(),
  dateDue: z.date(),
  description: z.string(),
});

export const taskFilterValidator = z.object({
  createdByUserId: optionalUuidValidator,
  assignedToUserId: optionalUuidValidator,
});

export type Task = z.infer<typeof taskValidator>;
export type TaskFilter = z.infer<typeof taskFilterValidator>;
