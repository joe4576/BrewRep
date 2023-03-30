/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TenantGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `TenantGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `TenantGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "isDemo" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TenantGroup" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TenantGroup_name_key" ON "TenantGroup"("name");

-- AddForeignKey
ALTER TABLE "TenantGroup" ADD CONSTRAINT "TenantGroup_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
