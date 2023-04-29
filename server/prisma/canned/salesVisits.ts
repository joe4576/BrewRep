import { PrismaClient } from "@prisma/client";
import { DateUtils } from "./dateUtils";
import { joesBreweryId, stMarysId, wetherspoonsId } from "./outlets";
import { joeId, tenantId } from "./tenants";

export default async function genenrateSalesVisitsData(prisma: PrismaClient) {
  await prisma.salesJourney.create({
    data: {
      tenantId,
      assignedUserId: joeId,
      date: new Date(),
      salesVisits: {
        createMany: {
          data: [
            {
              tenantId,
              outletId: joesBreweryId,
              startTime: new DateUtils().plusHours(1).toDate(),
              endTime: new DateUtils().plusHours(2).toDate(),
            },
            {
              tenantId,
              outletId: stMarysId,
              startTime: new DateUtils().plusHours(2).plusMinutes(30).toDate(),
              endTime: new DateUtils().plusHours(3).toDate(),
            },
            {
              tenantId,
              outletId: wetherspoonsId,
              startTime: new DateUtils().plusHours(3).plusMinutes(20).toDate(),
              endTime: new DateUtils().plusHours(4).toDate(),
            },
          ],
        },
      },
    },
  });
}
