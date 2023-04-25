import { router, tenantProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Task, taskFilterValidator, taskValidator } from "../models/task.model";
import { TaskService } from "../services/taskService";
import { uuidValidator } from "../models/validators/commonValidators";

export const taskRouter = router({
  createTask: tenantProcedure
    .input(taskValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const taskService = new TaskService(tenant.id!);

      try {
        return await taskService.createTask(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to create task",
        });
      }
    }),

  getTask: tenantProcedure
    .input(uuidValidator)
    .query(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const taskService = new TaskService(tenant.id!);

      try {
        return await taskService.getTask(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get task",
        });
      }
    }),

  getTaskByFilter: tenantProcedure
    .input(taskFilterValidator)
    .query(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const taskService = new TaskService(tenant.id!);

      let tasks: Task[] = [];

      try {
        tasks = await taskService.getTasksByFilter(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get tasks by filter",
        });
      }

      return tasks;
    }),

  getAllTasks: tenantProcedure.query(async ({ ctx }) => {
    const { tenant } = ctx;

    const taskService = new TaskService(tenant.id!);

    let tasks: Task[] = [];

    try {
      tasks = await taskService.getAllTasks();
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: e,
        message: "Failed to get all tasks",
      });
    }

    return tasks;
  }),

  saveTask: tenantProcedure
    .input(taskValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;

      const taskService = new TaskService(tenant.id!);

      try {
        return await taskService.saveTask(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to save task",
        });
      }
    }),

  deleteTask: tenantProcedure
    .input(taskValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;

      const taskService = new TaskService(tenant.id!);

      try {
        await taskService.deleteTask(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to save task",
        });
      }
    }),
});
