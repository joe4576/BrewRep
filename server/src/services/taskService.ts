import prisma from "../../prismaClient";
import { type Task, type TaskFilter } from "../models/task.model";
import { BaseService } from "./baseService";

export class TaskService extends BaseService {
  public async createTask(task: Task) {
    if (task.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

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
    const { assignedToUserId, createdByUserId, assignedSalesVisitId } =
      taskFilter;

    const whereClause: Partial<Task> = {
      tenantId: this.tenantId,
    };

    if (assignedToUserId) {
      whereClause.assignedToUserId = assignedToUserId;
    }

    if (createdByUserId) {
      whereClause.createdByUserId = createdByUserId;
    }

    if (assignedSalesVisitId) {
      whereClause.assignedSalesVisitId = assignedSalesVisitId;
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
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

  public async saveTask(task: Task) {
    if (task.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: task,
    });

    return updatedTask;
  }

  public async deleteTask(task: Task) {
    if (task.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });
  }
}
