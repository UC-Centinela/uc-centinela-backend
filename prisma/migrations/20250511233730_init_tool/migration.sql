-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "criticActivityId" INTEGER NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "tool_criticActivityId_fkey" FOREIGN KEY ("criticActivityId") REFERENCES "CriticActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
