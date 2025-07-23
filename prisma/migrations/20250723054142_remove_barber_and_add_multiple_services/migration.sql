/*
  Warnings:

  - You are about to drop the column `barberId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_barberId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_serviceId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "barberId",
DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "ScheduleService" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ScheduleService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleService_scheduleId_serviceId_key" ON "ScheduleService"("scheduleId", "serviceId");

-- AddForeignKey
ALTER TABLE "ScheduleService" ADD CONSTRAINT "ScheduleService_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleService" ADD CONSTRAINT "ScheduleService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
