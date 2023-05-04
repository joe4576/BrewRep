-- DropForeignKey
ALTER TABLE "BrewmanLink" DROP CONSTRAINT "BrewmanLink_tenantId_fkey";

-- AddForeignKey
ALTER TABLE "BrewmanLink" ADD CONSTRAINT "BrewmanLink_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
