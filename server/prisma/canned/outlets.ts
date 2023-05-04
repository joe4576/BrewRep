import { PrismaClient } from "@prisma/client";
import { SharedIds } from "./utils";

export default async function generateOutletData(
  prisma: PrismaClient,
  options: {
    sharedIds: SharedIds;
  }
) {
  const { sharedIds } = options;

  await prisma.outlet.createMany({
    data: [
      {
        id: sharedIds.joesBreweryId,
        tenantId: sharedIds.tenantId,
        name: "Joe's Brewery",
        code: "JB",
        lat: "50.896904",
        long: "-1.395288",
      },
      {
        id: sharedIds.wetherspoonsId,
        tenantId: sharedIds.tenantId,
        name: "Wetherspoons",
        code: "WSP",
        lat: "50.903198",
        long: "-1.392230",
      },
      {
        id: sharedIds.premierSystemsId,
        tenantId: sharedIds.tenantId,
        name: "Premier Systems",
        code: "PSLTD",
        lat: "50.895232",
        long: "-1.382204",
      },
      {
        id: sharedIds.stMarysId,
        tenantId: sharedIds.tenantId,
        name: "St Mary's Staduim",
        code: "SMS",
        lat: "50.905641",
        long: "-1.389542",
      },
      {
        id: sharedIds.westQuayId,
        tenantId: sharedIds.tenantId,
        name: "Westquay",
        code: "WQY",
        lat: "50.903909",
        long: "-1.408441",
      },
    ],
  });
}
