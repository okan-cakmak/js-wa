-- CreateTable
CREATE TABLE "WebsocketApp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WebsocketApp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WebsocketApp" ADD CONSTRAINT "WebsocketApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
