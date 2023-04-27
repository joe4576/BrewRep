import { PrismaClient } from "@prisma/client";
import generateTenantData from "./tenants";
import generateTaskData from "./tasks";
import generateOutletData from "./outlets";

const prisma = new PrismaClient();

async function dropAllRows() {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.tenant.deleteMany(),
    prisma.task.deleteMany(),
  ]);
}

async function main() {
  await dropAllRows();
  await generateTenantData(prisma);
  await generateTaskData(prisma);
  await generateOutletData(prisma);
}

main().catch((e) => {
  console.error(e);
});
