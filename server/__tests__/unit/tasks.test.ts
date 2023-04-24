import { describe, it, expect, vi, beforeEach } from "vitest";
import prismaMock from "../../__mocks__/prismaClient";
import type { Task } from "../../src/models/task.model";
import { v4 as uuid } from "uuid";
import { TaskService } from "../../src/services/taskService";

// mock prisma client moduule
vi.mock("../../prismaClient");

describe("Task Unit Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getTask", async () => {
    const taskId = uuid();
    const tenantId = uuid();
    const taskService = new TaskService(tenantId);

    const task: Task = {
      id: taskId,
      createdByUserId: uuid(),
      dateCreated: new Date(),
      tenantId,
      description: "This is the task's description",
    };

    // Mocks resolved value from the in-memory prisma mock
    // @ts-ignore
    prismaMock.task.findFirst.mockResolvedValueOnce(task);

    // check that a seeded task does exist
    const foundTask = await taskService.getTask(taskId);
    expect(foundTask).toStrictEqual(task);

    // check that function throws if getting non-existent task
    await expect(taskService.getTask("123")).rejects.toThrowError();
  });

  it("createTask", async () => {
    const existingTaskId = uuid();
    const newTaskId = uuid();
    const tenantId = uuid();
    const taskService = new TaskService(tenantId);

    // mock a task that already exists
    const existingTask: Task = {
      id: existingTaskId,
      createdByUserId: uuid(),
      dateCreated: new Date(),
      tenantId,
      description: "This is the task's description",
    };

    const newTask: Task = {
      ...existingTask,
      id: newTaskId,
    };

    // @ts-ignore
    prismaMock.task.findFirst.mockResolvedValueOnce(existingTask);

    // check that creating a task with an existing id throws
    await expect(taskService.createTask(existingTask)).rejects.toThrowError();

    // check that creating a new task returns the new id
    const newId = await taskService.createTask(newTask);
    expect(newId).toBe(newTaskId);
  });

  it("getAllTasks", async () => {
    const task1Id = uuid();
    const task2Id = uuid();
    const tenantId = uuid();
    const taskService = new TaskService(tenantId);

    const tasks: Task[] = [
      {
        id: task1Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: uuid(),
        description: "Task 1 Description",
      },
      {
        id: task2Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: uuid(),
        description: "Task 1 Description",
      },
    ];

    // @ts-ignore
    prismaMock.task.findMany.mockResolvedValueOnce(tasks);

    const allTasks = await taskService.getAllTasks();

    // check that both tasks were returned by the function
    tasks.forEach((task) => {
      expect(allTasks.find((t) => t.id === task.id)).toBeTruthy();
    });
  });

  it("getTasksByFilter", async () => {
    /**
     * create tasks
     * 1. created by joe, assigned to joe
     * 2. created by joe, assigned to chris
     * 3. created by joe, no assignee
     *
     * 4. created by chris, assigned to chris
     * 5. created by chris, assigned to joe
     * 6. created by chris, no assignee
     */

    const joeId = uuid();
    const chrisId = uuid();

    const task1Id = uuid();
    const task2Id = uuid();
    const task3Id = uuid();
    const task4Id = uuid();
    const task5Id = uuid();
    const task6Id = uuid();

    const tenantId = uuid();
    const taskService = new TaskService(tenantId);

    const tasks: Task[] = [
      {
        id: task1Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: joeId,
        assignedToUserId: joeId,
      },
      {
        id: task2Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: joeId,
        assignedToUserId: chrisId,
      },
      {
        id: task3Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: joeId,
      },
      {
        id: task4Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: chrisId,
        assignedToUserId: chrisId,
      },
      {
        id: task5Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: chrisId,
        assignedToUserId: joeId,
      },
      {
        id: task6Id,
        tenantId,
        dateCreated: new Date(),
        createdByUserId: chrisId,
      },
    ];

    const tasksMap = new Map<string, Task>();

    tasks.forEach((task) => {
      tasksMap.set(task.id, task);
    });

    // @ts-ignore
    prismaMock.task.findMany.mockResolvedValueOnce([
      tasksMap.get(task1Id),
      tasksMap.get(task5Id),
    ] as Task[]);

    // get all tasks assigned to joe
    const tasksAssignedToJoe = await taskService.getTasksByFilter({
      assignedToUserId: joeId,
    });

    expect(tasksAssignedToJoe.length).toBe(2);
    [task1Id, task5Id].forEach((id) => {
      expect(tasksAssignedToJoe.find((task) => task.id === id)).toBeTruthy();
    });

    // @ts-ignore
    prismaMock.task.findMany.mockResolvedValueOnce([
      tasksMap.get(task4Id),
      tasksMap.get(task5Id),
      tasksMap.get(task6Id),
    ] as Task[]);

    // get all tasks created by chris
    const tasksCreatedByChris = await taskService.getTasksByFilter({
      createdByUserId: chrisId,
    });

    expect(tasksCreatedByChris.length).toBe(3);

    [task4Id, task5Id, task6Id].forEach((id) => {
      expect(tasksCreatedByChris.find((task) => task.id === id)).toBeTruthy();
    });
  });
});
