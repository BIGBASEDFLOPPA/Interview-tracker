-- CreateEnum
CREATE TYPE "InterviewEntryType" AS ENUM ('THEORY', 'LIVE_CODING', 'QUESTION', 'NOTE');

-- AlterEnum
ALTER TYPE "InterviewStatus" ADD VALUE 'FAKE';

-- CreateTable
CREATE TABLE "InterviewEntry" (
    "id" SERIAL NOT NULL,
    "type" "InterviewEntryType" NOT NULL,
    "content" TEXT NOT NULL,
    "interviewId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewEntry" ADD CONSTRAINT "InterviewEntry_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
