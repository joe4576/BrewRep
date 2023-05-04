import { PrismaClient } from "@prisma/client";
import { chrisId, joeId, tenantId } from "./tenants";
import { DateUtils } from "./dateUtils";

export default async function generateTaskData(prisma: PrismaClient) {
  await prisma.task.createMany({
    data: [
      {
        tenantId,
        createdByUserId: joeId,
        dateCreated: new DateUtils("monday").plusHours(10).toDate(),
        dateDue: new DateUtils("tuesday").plusHours(9).toDate(),
        description: "Joe's Task for Joe",
        assignedToUserId: joeId,
      },
      {
        tenantId,
        createdByUserId: joeId,
        dateCreated: new DateUtils("monday").plusHours(10).toDate(),
        dateDue: new DateUtils("tuesday").plusHours(14).toDate(),
        description: "Joe's Task for chris",
        assignedToUserId: chrisId,
      },
      {
        tenantId,
        createdByUserId: joeId,
        dateCreated: new DateUtils("monday").plusHours(10).toDate(),
        dateDue: new DateUtils("monday").plusHours(13).toDate(),
        description: "Joe's unassigned task",
      },
      {
        tenantId,
        createdByUserId: chrisId,
        dateCreated: new DateUtils("thursday").plusHours(10).toDate(),
        dateDue: new DateUtils("friday").plusHours(11).plusMinutes(30).toDate(),
        description: "Chris' Task for chris",
        assignedToUserId: chrisId,
      },
      {
        tenantId,
        createdByUserId: chrisId,
        dateCreated: new DateUtils("wednesday").plusHours(10).toDate(),
        dateDue: new DateUtils("thursday").plusHours(12).toDate(),
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
