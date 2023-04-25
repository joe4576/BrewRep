import { type Task, type TaskFilter } from "../models/task.model";
import { BaseService } from "./baseService";
import prisma from "../../prismaClient";

export class TaskService extends BaseService {
  public async createTask(task: Task) {
    const foundTask = await prisma.task.findFirst({
      where: {
        id: task.id,
        AND: {
          tenantId: this.tenantId,
        },
      },
    });

    if (foundTask) {
      throw new Error(`Task with id ${task.id} already exists`);
    }

    // override tenantId with verified id from middleware
    task.tenantId = this.tenantId;

    await prisma.task.create({
      data: task,
    });

    return task;
  }

  public async getTask(taskId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        AND: {
          tenantId: this.tenantId,
        },
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  public async getTasksByFilter(taskFilter: TaskFilter) {
    const { assignedToUserId, createdByUserId } = taskFilter;

    const tasks = await prisma.task.findMany({
      where: {
        tenantId: this.tenantId,
        AND: {
          assignedToUserId: assignedToUserId ?? undefined,
          AND: {
            createdByUserId: createdByUserId ?? undefined,
          },
        },
      },
    });

    return tasks;
  }

  public async getAllTasks() {
    const tasks = await prisma.task.findMany({
      where: {
        tenantId: this.tenantId,
      },
    });

    return tasks;
  }
}
