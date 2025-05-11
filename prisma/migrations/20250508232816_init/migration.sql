-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "photoUrl" TEXT,
    "videoUrl" TEXT,
    "audioTranscription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "multimedia_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
