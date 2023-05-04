import { PrismaClient } from "@prisma/client";
import { DateUtils } from "./dateUtils";
import {
  joesBreweryId,
  premierSystemsId,
  stMarysId,
  westQuayId,
  wetherspoonsId,
} from "./outlets";
import { chrisId, joeId, tenantId } from "./tenants";
import { v4 as uuid } from "uuid";

export default async function generateSalesVisitData(prisma: PrismaClient) {
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
      tenantId,
      assignedUserId: joeId,
      date: new DateUtils("monday").toDate(),
      reference: "Journey #1",
      salesVisits: {
        createMany: {
          data: [
            {
              id: visit1Id,
              tenantId,
              outletId: joesBreweryId,
              startTime: new DateUtils("monday").plusHours(10).toDate(),
              endTime: new DateUtils("monday")
                .plusHours(11)
                .plusMinutes(30)
                .toDate(),
              reference: "Joe's Brewery visit",
            },
            {
              id: visit2Id,
              tenantId,
              outletId: stMarysId,
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
              tenantId,
              outletId: wetherspoonsId,
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
      tenantId,
      assignedUserId: chrisId,
      date: new DateUtils("wednesday").toDate(),
      reference: "Journey #2",
      salesVisits: {
        createMany: {
          data: [
            {
              id: visit4Id,
              tenantId,
              outletId: westQuayId,
              startTime: new DateUtils("wednesday").plusHours(9).toDate(),
              endTime: new DateUtils("wednesday").plusHours(10).toDate(),
              reference: "West Quay visit #2",
            },
            {
              id: visit5Id,
              tenantId,
              outletId: wetherspoonsId,
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
              tenantId,
              outletId: joesBreweryId,
              startTime: new DateUtils("wednesday")
                .plusHours(13)
                .plusMinutes(45)
                .toDate(),
              endTime: new DateUtils("wednesday").plusHours(15).toDate(),
              reference: "Joe's Brewery visit #2",
            },

            {
              id: visit7Id,
              tenantId,
              outletId: premierSystemsId,
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
        tenantId,
        authorId: joeId,
        description: "Initial Communication",
        outletId: wetherspoonsId,
      },
      {
        tenantId,
        salesVisitId: visit1Id,
        authorId: joeId,
        description:
          "Follow up communication, they might be interested in ordering",
        outletId: joesBreweryId,
      },
      {
        tenantId,
        salesVisitId: visit2Id,
        authorId: joeId,
        description:
          "First conversation went well, they will be in contact to arrange a follow up meeting",
        outletId: stMarysId,
      },
      {
        tenantId,
        salesVisitId: visit2Id,
        authorId: chrisId,
        description: "Chris spoke to them and they want to order next week",
        outletId: stMarysId,
      },
      {
        tenantId,
        salesVisitId: visit3Id,
        authorId: joeId,
        description: "They are interested in Plucky Star IPA",
        outletId: wetherspoonsId,
      },
    ],
  });
}
