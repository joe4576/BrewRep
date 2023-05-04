import { PrismaClient } from "@prisma/client";
import { DateUtils } from "./dateUtils";
import { SharedIds } from "./utils";

export default async function generateTaskData(
  prisma: PrismaClient,
  options: {
    sharedIds: SharedIds;
  }
) {
  const { sharedIds } = options;
  await prisma.task.createMany({
    data: [
      {
        tenantId: sharedIds.tenantId,
        createdByUserId: sharedIds.userId,
        dateCreated: new DateUtils("monday").plusHours(10).toDate(),
        dateDue: new DateUtils("tuesday").plusHours(9).toDate(),
        description: "Joe's Task for Joe",
        assignedToUserId: sharedIds.userId,
      },
      {
        tenantId: sharedIds.tenantId,
        createdByUserId: sharedIds.userId,
        dateCreated: new DateUtils("monday").plusHours(10).toDate(),
        dateDue: new DateUtils("tuesday").plusHours(14).toDate(),
        description: "Joe's Task for Joe 2",
        assignedToUserId: sharedIds.userId,
      },
      {
        tenantId: sharedIds.tenantId,
        createdByUserId: sharedIds.userId,
        dateCreated: new DateUtils("monday").plusHours(10).toDate(),
        dateDue: new DateUtils("monday").plusHours(13).toDate(),
        description: "Joe's unassigned task",
      },
      {
        tenantId: sharedIds.tenantId,
        createdByUserId: sharedIds.userId,
        dateCreated: new DateUtils("thursday").plusHours(10).toDate(),
        dateDue: new DateUtils("friday").plusHours(11).plusMinutes(30).toDate(),
        description: "Email that important person",
        assignedToUserId: sharedIds.userId,
      },
      {
        tenantId: sharedIds.tenantId,
        createdByUserId: sharedIds.userId,
        dateCreated: new DateUtils("wednesday").plusHours(10).toDate(),
        dateDue: new DateUtils("thursday").plusHours(12).toDate(),
        description: "Make sure to take a phone call",
        assignedToUserId: sharedIds.userId,
      },
      {
        tenantId: sharedIds.tenantId,
        createdByUserId: sharedIds.userId,
        dateCreated: new Date(),
        dateDue: new DateUtils().plusDays(2).plusHours(6).toDate(),
        description: "Another unassigned task",
      },
    ],
  });
}
