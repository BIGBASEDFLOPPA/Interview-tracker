-- CreateEnum
CREATE TYPE "TheoryCategory" AS ENUM ('HTML', 'CSS', 'JS_TS', 'FRAMEWORKS', 'ALGORITHMS', 'OTHER');

-- CreateEnum
CREATE TYPE "TheoryScope" AS ENUM ('FRONTEND', 'BACKEND', 'FULLSTACK');

-- CreateTable
CREATE TABLE "TheoryQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" "TheoryCategory" NOT NULL,
    "scope" "TheoryScope" NOT NULL,
    "learned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TheoryQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TheoryQuestion" ADD CONSTRAINT "TheoryQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
