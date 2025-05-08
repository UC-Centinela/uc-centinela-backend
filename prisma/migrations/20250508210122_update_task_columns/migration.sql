/*
  Warnings:

  - You are about to drop the column `audioTranscription` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "audioTranscription",
DROP COLUMN "videoUrl",
ADD COLUMN     "changeHistory" TEXT;
