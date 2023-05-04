import { PrismaClient } from "@prisma/client";
import generateTenantData from "./tenants";
import generateTaskData from "./tasks";
import generateOutletData from "./outlets";
import generateSalesVisitData from "./salesVisits";
import { createSharedIds } from "./utils";

const prisma = new PrismaClient();

async function dropAllRows() {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.tenant.deleteMany(),
    prisma.task.deleteMany(),
    prisma.outlet.deleteMany(),
    prisma.salesJourney.deleteMany(),
    prisma.salesVisit.deleteMany(),
    prisma.communicationLog.deleteMany(),
    prisma.brewmanLink.deleteMany(),
  ]);
}

async function main() {
  const sharedIds = createSharedIds();

  await dropAllRows();
  await generateTenantData(prisma, {
    sharedIds,
  });
  await generateTaskData(prisma, {
    sharedIds,
  });
  await generateOutletData(prisma, {
    sharedIds,
  });
  await generateSalesVisitData(prisma, {
    sharedIds,
  });
}

main().catch((e) => {
  console.error(e);
});
