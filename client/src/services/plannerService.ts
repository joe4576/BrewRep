import { Task } from "@server/models/task.model";

export const eventIsTask = (event: any): event is Task =>
  event.description !== undefined;
