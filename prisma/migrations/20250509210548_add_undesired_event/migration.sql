-- CreateTable
CREATE TABLE "UndesiredEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "criticActivityId" INTEGER NOT NULL,

    CONSTRAINT "UndesiredEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UndesiredEvent" ADD CONSTRAINT "undesired_event_criticActivityId_fkey" FOREIGN KEY ("criticActivityId") REFERENCES "CriticActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
