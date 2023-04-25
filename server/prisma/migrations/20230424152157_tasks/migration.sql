-- CreateTable
CREATE TABLE "Task" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "assignedToUserId" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDue" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
