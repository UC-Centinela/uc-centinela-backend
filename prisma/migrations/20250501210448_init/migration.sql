-- CreateEnum
CREATE TYPE "TaskState" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'REVIEWED');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "state" "TaskState" NOT NULL DEFAULT 'PENDING',
    "instruction" TEXT NOT NULL,
    "comments" TEXT,
    "videoUrl" TEXT,
    "audioTranscription" TEXT,
    "assignationDate" TIMESTAMP(3),
    "requiredSendDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorUserId" INTEGER NOT NULL,
    "revisorUserId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "critic_activities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "critic_activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_revisorUserId_fkey" FOREIGN KEY ("revisorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "critic_activities" ADD CONSTRAINT "critic_activities_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
