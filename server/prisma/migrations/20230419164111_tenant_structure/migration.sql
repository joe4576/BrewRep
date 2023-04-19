/*
  Warnings:

  - You are about to drop the column `tenantGroupId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `TenantGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TenantGroupToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_tenantGroupId_fkey";

-- DropForeignKey
ALTER TABLE "_TenantGroupToUser" DROP CONSTRAINT "_TenantGroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TenantGroupToUser" DROP CONSTRAINT "_TenantGroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "tenantGroupId",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "TenantGroup";

-- DropTable
DROP TABLE "_TenantGroupToUser";

-- CreateTable
CREATE TABLE "_TenantToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TenantToUser_AB_unique" ON "_TenantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TenantToUser_B_index" ON "_TenantToUser"("B");

-- AddForeignKey
ALTER TABLE "_TenantToUser" ADD CONSTRAINT "_TenantToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TenantToUser" ADD CONSTRAINT "_TenantToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
