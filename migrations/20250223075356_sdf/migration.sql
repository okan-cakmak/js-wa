/*
  Warnings:

  - You are about to drop the `app_metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "app_metrics";

-- CreateTable
CREATE TABLE "AppMetrics" (
    "id" TEXT NOT NULL,
    "metrics" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppMetrics_pkey" PRIMARY KEY ("id")
);
