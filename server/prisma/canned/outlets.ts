import { PrismaClient } from "@prisma/client";
import { tenantId } from "./tenants";

export default async function generateOutletData(prisma: PrismaClient) {
  await prisma.outlet.createMany({
    data: [
      {
        tenantId,
        name: "Joe's Brewery",
        code: "JB",
        lat: "50.896904",
        long: "-1.395288",
      },
      {
        tenantId,
        name: "Wetherspoons",
        code: "WSP",
        lat: "50.903198",
        long: "-1.392230",
      },
      {
        tenantId,
        name: "Premier Systems",
        code: "PSLTD",
        lat: "50.895232",
        long: "-1.382204",
      },
      {
        tenantId,
        name: "St Mary's Staduim",
        code: "SMS",
        lat: "50.905641",
        long: "-1.389542",
      },
      {
        tenantId,
        name: "Westquay",
        code: "WQY",
        lat: "50.903909",
        long: "-1.408441",
      },
    ],
  });
}
