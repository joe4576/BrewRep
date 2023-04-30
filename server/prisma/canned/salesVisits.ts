import { PrismaClient } from "@prisma/client";
import { DateUtils } from "./dateUtils";
import { joesBreweryId, stMarysId, wetherspoonsId } from "./outlets";
import { chrisId, joeId, tenantId } from "./tenants";
import { v4 as uuid } from "uuid";

export default async function generateSalesVisitData(prisma: PrismaClient) {
  const visit1Id = uuid();
  const visit2Id = uuid();
  const visit3Id = uuid();

  await prisma.salesJourney.create({
    data: {
      tenantId,
      assignedUserId: joeId,
      date: new Date(),
      reference: "Journey #1",
      salesVisits: {
        createMany: {
          data: [
            {
              id: visit1Id,
              tenantId,
              outletId: joesBreweryId,
              startTime: new DateUtils().plusHours(1).toDate(),
              endTime: new DateUtils().plusHours(2).toDate(),
              reference: "Joe's Brewery visit",
            },
            {
              id: visit2Id,
              tenantId,
              outletId: stMarysId,
              startTime: new DateUtils().plusHours(2).plusMinutes(30).toDate(),
              endTime: new DateUtils().plusHours(3).toDate(),
              reference: "St Mary's visit",
            },
            {
              id: visit3Id,
              tenantId,
              outletId: wetherspoonsId,
              startTime: new DateUtils().plusHours(3).plusMinutes(20).toDate(),
              endTime: new DateUtils().plusHours(4).toDate(),
              reference: "Wetherspoons Visit",
            },
          ],
        },
      },
    },
  });

  await prisma.communicationLog.createMany({
    data: [
      {
        tenantId,
        authorId: joeId,
        description: "Initial Communication",
      },
      {
        tenantId,
        salesVisitId: visit1Id,
        authorId: joeId,
        description:
          "Follow up communication, they might be interested in ordering",
      },
      {
        tenantId,
        salesVisitId: visit2Id,
        authorId: joeId,
        description:
          "First conversation went well, they will be in contact to arrange a follow up meeting",
      },
      {
        tenantId,
        salesVisitId: visit2Id,
        authorId: chrisId,
        description: "Chris spoke to them and they want to order next week",
      },
      {
        tenantId,
        salesVisitId: visit3Id,
        authorId: joeId,
        description: "They are interested in Plucky Star IPA",
      },
    ],
  });
}
