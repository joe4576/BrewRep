-- AlterTable
ALTER TABLE "Outlet" ADD COLUMN     "isBrewManOutlet" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BrewmanLink" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "brewmanApiKey" TEXT NOT NULL,
    "brewmanTenantId" TEXT NOT NULL,

    CONSTRAINT "BrewmanLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrewmanLink_tenantId_key" ON "BrewmanLink"("tenantId");

-- AddForeignKey
ALTER TABLE "BrewmanLink" ADD CONSTRAINT "BrewmanLink_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
