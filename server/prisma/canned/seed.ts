import { PrismaClient } from "@prisma/client";
import generateTenantData from "./tenants";
import generateTaskData from "./tasks";

const prisma = new PrismaClient();

async function dropAllRows() {
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.tenant.deleteMany(),
    prisma.task.deleteMany(),
  ]);
}

async function main() {
  await dropAllRows();
  await generateTenantData(prisma);
  await generateTaskData(prisma);
}

main().catch((e) => {
  console.error(e);
});
