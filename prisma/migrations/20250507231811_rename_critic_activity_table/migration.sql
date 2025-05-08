/*
  Warnings:

  - You are about to drop the `critic_activities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "critic_activities" DROP CONSTRAINT "critic_activities_taskId_fkey";

-- DropTable
DROP TABLE "critic_activities";

-- CreateTable
CREATE TABLE "CriticActivity" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "critic_activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CriticActivity" ADD CONSTRAINT "critic_activities_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
