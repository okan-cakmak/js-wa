-- CreateTable
CREATE TABLE "app_metrics" (
    "appId" UUID NOT NULL,
    "metrics" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_metrics_pkey" PRIMARY KEY ("appId")
);
