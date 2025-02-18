/*
  Warnings:

  - You are about to drop the column `appId` on the `WebsocketApp` table. All the data in the column will be lost.
  - You are about to drop the column `appKey` on the `WebsocketApp` table. All the data in the column will be lost.
  - You are about to drop the column `appSecret` on the `WebsocketApp` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `WebsocketApp` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `WebsocketApp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WebsocketApp" DROP COLUMN "appId",
DROP COLUMN "appKey",
DROP COLUMN "appSecret",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "enableClientMessages" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enableUserAuthentication" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "key" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "maxBackendEventsPerSec" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxChannelNameLength" INTEGER,
ADD COLUMN     "maxClientEventsPerSec" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxConnections" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxEventBatchSize" INTEGER,
ADD COLUMN     "maxEventChannelsAtOnce" INTEGER,
ADD COLUMN     "maxEventNameLength" INTEGER,
ADD COLUMN     "maxEventPayloadInKb" INTEGER,
ADD COLUMN     "maxPresenceMemberSizeInKb" INTEGER,
ADD COLUMN     "maxPresenceMembersPerChannel" INTEGER,
ADD COLUMN     "maxReadReqPerSec" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "secret" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "webhooks" JSONB;
