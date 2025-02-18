/*
  Warnings:

  - Added the required column `appId` to the `WebsocketApp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appKey` to the `WebsocketApp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appSecret` to the `WebsocketApp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `WebsocketApp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `WebsocketApp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebsocketApp" ADD COLUMN     "appId" TEXT NOT NULL,
ADD COLUMN     "appKey" TEXT NOT NULL,
ADD COLUMN     "appSecret" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
