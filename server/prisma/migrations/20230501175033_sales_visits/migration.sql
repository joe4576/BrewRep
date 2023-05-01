-- CreateEnum
CREATE TYPE "SalesVisitStatus" AS ENUM ('OPEN', 'COMPLETE');

-- CreateTable
CREATE TABLE "CommunicationLog" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salesVisitId" TEXT,
    "authorId" TEXT NOT NULL,
    "outletId" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunicationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesVisit" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "outletId" TEXT NOT NULL,
    "salesJourneyId" TEXT,
    "status" "SalesVisitStatus" NOT NULL DEFAULT 'OPEN',
    "reference" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SalesVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesJourney" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "startMilage" INTEGER NOT NULL DEFAULT 0,
    "endMilage" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "assignedUserId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "reference" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SalesJourney_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_salesVisitId_fkey" FOREIGN KEY ("salesVisitId") REFERENCES "SalesVisit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesVisit" ADD CONSTRAINT "SalesVisit_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesVisit" ADD CONSTRAINT "SalesVisit_salesJourneyId_fkey" FOREIGN KEY ("salesJourneyId") REFERENCES "SalesJourney"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesJourney" ADD CONSTRAINT "SalesJourney_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
