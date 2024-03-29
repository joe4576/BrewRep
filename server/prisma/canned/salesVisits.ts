import { PrismaClient } from "@prisma/client";
import { DateUtils } from "./dateUtils";
import { v4 as uuid } from "uuid";
import { SharedIds } from "./utils";

export default async function generateSalesVisitData(
  prisma: PrismaClient,
  options: {
    sharedIds: SharedIds;
  }
) {
  const { sharedIds } = options;

  // Journey 1
  const visit1Id = uuid();
  const visit2Id = uuid();
  const visit3Id = uuid();

  // Journey2
  const visit4Id = uuid();
  const visit5Id = uuid();
  const visit6Id = uuid();
  const visit7Id = uuid();

  await prisma.salesJourney.create({
    data: {
      tenantId: sharedIds.tenantId,
      assignedUserId: sharedIds.userId,
      date: new DateUtils("monday").plusHours(9).toDate(),
      reference: "Journey #1",
      salesVisits: {
        createMany: {
          data: [
            {
              id: visit1Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.joesBreweryId,
              startTime: new DateUtils("monday").plusHours(10).toDate(),
              endTime: new DateUtils("monday")
                .plusHours(11)
                .plusMinutes(30)
                .toDate(),
              reference: "Joe's Brewery visit",
            },
            {
              id: visit2Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.stMarysId,
              startTime: new DateUtils("monday")
                .plusHours(12)
                .plusMinutes(30)
                .toDate(),
              endTime: new DateUtils("monday")
                .plusHours(13)
                .plusMinutes(30)
                .toDate(),
              reference: "St Mary's visit",
            },
            {
              id: visit3Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.wetherspoonsId,
              startTime: new DateUtils("monday").plusHours(16).toDate(),
              endTime: new DateUtils("monday").plusHours(17).toDate(),
              reference: "Wetherspoons Visit",
            },
          ],
        },
      },
    },
  });

  await prisma.salesJourney.create({
    data: {
      tenantId: sharedIds.tenantId,
      assignedUserId: sharedIds.userId,
      date: new DateUtils("wednesday").plusHours(8).plusMinutes(30).toDate(),
      reference: "Journey #2",
      salesVisits: {
        createMany: {
          data: [
            {
              id: visit4Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.westQuayId,
              startTime: new DateUtils("wednesday").plusHours(9).toDate(),
              endTime: new DateUtils("wednesday").plusHours(10).toDate(),
              reference: "West Quay visit #2",
            },
            {
              id: visit5Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.wetherspoonsId,
              startTime: new DateUtils("wednesday")
                .plusHours(11)
                .plusMinutes(30)
                .toDate(),
              endTime: new DateUtils("wednesday")
                .plusHours(13)
                .plusMinutes(30)
                .toDate(),
              reference: "Wetherspoons Visit #2",
            },
            {
              id: visit6Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.joesBreweryId,
              startTime: new DateUtils("wednesday")
                .plusHours(13)
                .plusMinutes(45)
                .toDate(),
              endTime: new DateUtils("wednesday").plusHours(15).toDate(),
              reference: "Joe's Brewery visit #2",
            },

            {
              id: visit7Id,
              tenantId: sharedIds.tenantId,
              outletId: sharedIds.premierSystemsId,
              startTime: new DateUtils("wednesday").plusHours(16).toDate(),
              endTime: new DateUtils("wednesday").plusHours(17).toDate(),
              reference: "Premier Systems visit #2",
            },
          ],
        },
      },
    },
  });

  await prisma.communicationLog.createMany({
    data: [
      {
        tenantId: sharedIds.tenantId,
        authorId: sharedIds.userId,
        description: "Initial Communication",
        outletId: sharedIds.wetherspoonsId,
      },
      {
        tenantId: sharedIds.tenantId,
        salesVisitId: visit1Id,
        authorId: sharedIds.userId,
        description:
          "Follow up communication, they might be interested in ordering",
        outletId: sharedIds.joesBreweryId,
      },
      {
        tenantId: sharedIds.tenantId,
        salesVisitId: visit2Id,
        authorId: sharedIds.userId,
        description:
          "First conversation went well, they will be in contact to arrange a follow up meeting",
        outletId: sharedIds.stMarysId,
      },
      {
        tenantId: sharedIds.tenantId,
        salesVisitId: visit2Id,
        authorId: sharedIds.userId,
        description: "Chris spoke to them and they want to order next week",
        outletId: sharedIds.stMarysId,
      },
      {
        tenantId: sharedIds.tenantId,
        salesVisitId: visit3Id,
        authorId: sharedIds.userId,
        description: "They are interested in Plucky Star IPA",
        outletId: sharedIds.wetherspoonsId,
      },
    ],
  });
}
