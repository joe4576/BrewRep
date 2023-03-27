import { PrismaClient } from "@prisma/client";
import generateTenantData from "./tenants";

const prisma = new PrismaClient();

generateTenantData(prisma).then(() => {
  // generate any other data
});
