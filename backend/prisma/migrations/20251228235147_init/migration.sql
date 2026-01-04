-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('PLANNED', 'PASSED', 'FAILED');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('HR', 'TECH', 'LIVE', 'OFFER');

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "InterviewStatus" NOT NULL,
    "type" "InterviewType" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
