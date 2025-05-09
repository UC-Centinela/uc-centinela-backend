-- CreateTable
CREATE TABLE "VerificationQuestion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "criticActivityId" INTEGER NOT NULL,

    CONSTRAINT "VerificationQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerificationQuestion" ADD CONSTRAINT "verification_question_criticActivityId_fkey" FOREIGN KEY ("criticActivityId") REFERENCES "CriticActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
