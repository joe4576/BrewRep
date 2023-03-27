/*
  Warnings:

  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tenantGroupId" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantGroup" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TenantGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TenantGroupToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TenantGroupToUser_AB_unique" ON "_TenantGroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TenantGroupToUser_B_index" ON "_TenantGroupToUser"("B");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_tenantGroupId_fkey" FOREIGN KEY ("tenantGroupId") REFERENCES "TenantGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TenantGroupToUser" ADD CONSTRAINT "_TenantGroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TenantGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TenantGroupToUser" ADD CONSTRAINT "_TenantGroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
