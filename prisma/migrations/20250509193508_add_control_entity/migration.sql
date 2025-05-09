-- CreateTable
CREATE TABLE "Control" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "criticActivityId" INTEGER NOT NULL,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "control_criticActivityId_fkey" FOREIGN KEY ("criticActivityId") REFERENCES "CriticActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
