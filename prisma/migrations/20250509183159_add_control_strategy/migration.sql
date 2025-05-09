-- CreateTable
CREATE TABLE "ControlStrategy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "ControlStrategy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ControlStrategy" ADD CONSTRAINT "control_strategy_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
