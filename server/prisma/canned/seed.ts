import { PrismaClient } from "@prisma/client";
import generateTenantData from "./tenants";
import generateTaskData from "./tasks";
import generateOutletData from "./outlets";
import generateSalesVisitData from "./salesVisits";

const prisma = new PrismaClient();

async function dropAllRows() {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.tenant.deleteMany(),
    prisma.task.deleteMany(),
    prisma.outlet.deleteMany(),
    prisma.salesJourney.deleteMany(),
    prisma.salesVisit.deleteMany(),
  ]);
}

async function main() {
  await dropAllRows();
  await generateTenantData(prisma);
  await generateTaskData(prisma);
  await generateOutletData(prisma);
  await generateSalesVisitData(prisma);
}

main().catch((e) => {
  console.error(e);
});
