-- CreateTable
CREATE TABLE "LiveCodingTask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveCodingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveCodingSolution" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveCodingSolution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LiveCodingSolution" ADD CONSTRAINT "LiveCodingSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveCodingSolution" ADD CONSTRAINT "LiveCodingSolution_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "LiveCodingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
