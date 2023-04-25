import { PrismaClient } from "@prisma/client";
import { chrisId, joeId, tenantId } from "./tenants";
import { DateUtils } from "./dateUtils";

export default async function generateTaskData(prisma: PrismaClient) {
  await prisma.task.createMany({
    data: [
      {
        tenantId,
        createdByUserId: joeId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusHours(1).toDate(),
        description: "Joe's Task for Joe",
        assignedToUserId: joeId,
      },
      {
        tenantId,
        createdByUserId: joeId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusHours(1).toDate(),
        description: "Joe's Task for chris",
        assignedToUserId: chrisId,
      },
      {
        tenantId,
        createdByUserId: joeId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusDays(1).toDate(),
        description: "Joe's unassigned task",
      },
      {
        tenantId,
        createdByUserId: chrisId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusHours(1).toDate(),
        description: "Chris' Task for chris",
        assignedToUserId: chrisId,
      },
      {
        tenantId,
        createdByUserId: chrisId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusHours(1).toDate(),
        description: "Chris' Task for Joe",
        assignedToUserId: joeId,
      },
      {
        tenantId,
        createdByUserId: chrisId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusDays(2).plusHours(6).toDate(),
        description: "Chris' unassigned task",
      },
    ],
  });
}
