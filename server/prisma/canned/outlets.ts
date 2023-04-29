import { PrismaClient } from "@prisma/client";
import { tenantId } from "./tenants";
import { v4 as uuid } from "uuid";

export const joesBreweryId = uuid();
export const wetherspoonsId = uuid();
export const premierSystemsId = uuid();
export const stMarysId = uuid();
export const westQuayId = uuid();

export default async function generateOutletData(prisma: PrismaClient) {
  await prisma.outlet.createMany({
    data: [
      {
        id: joesBreweryId,
        tenantId,
        name: "Joe's Brewery",
        code: "JB",
        lat: "50.896904",
        long: "-1.395288",
      },
      {
        id: wetherspoonsId,
        tenantId,
        name: "Wetherspoons",
        code: "WSP",
        lat: "50.903198",
        long: "-1.392230",
      },
      {
        id: premierSystemsId,
        tenantId,
        name: "Premier Systems",
        code: "PSLTD",
        lat: "50.895232",
        long: "-1.382204",
      },
      {
        id: stMarysId,
        tenantId,
        name: "St Mary's Staduim",
        code: "SMS",
        lat: "50.905641",
        long: "-1.389542",
      },
      {
        id: westQuayId,
        tenantId,
        name: "Westquay",
        code: "WQY",
        lat: "50.903909",
        long: "-1.408441",
      },
    ],
  });
}
