import type { SubscriptionStatus } from '../plans';
import { PaymentPlanId } from '../plans';
import { PrismaClient } from '@prisma/client';

export const updateUserLemonSqueezyPaymentDetails = async (
  { lemonSqueezyId, userId, subscriptionPlan, subscriptionStatus, datePaid, numOfCreditsPurchased, lemonSqueezyCustomerPortalUrl }: {
    lemonSqueezyId: string;
    userId: string;
    subscriptionPlan?: PaymentPlanId;
    subscriptionStatus?: SubscriptionStatus;
    numOfCreditsPurchased?: number;
    lemonSqueezyCustomerPortalUrl?: string;
    datePaid?: Date;
  },
  prismaUserDelegate: PrismaClient['user']
) => {
  return prismaUserDelegate.update({
    where: {
      id: userId,
    },
    data: {
      paymentProcessorUserId: lemonSqueezyId,
      lemonSqueezyCustomerPortalUrl,
      subscriptionPlan,
      subscriptionStatus,
      datePaid,
      credits: numOfCreditsPurchased !== undefined ? { increment: numOfCreditsPurchased } : undefined,
    },
  });
};

export const updateAppConnectionLimit = async ({ userId, connectionLimit }: { userId: string; connectionLimit: number }, prismaWebsocketAppDelegate: PrismaClient['websocketApp']) => {
  return prismaWebsocketAppDelegate.updateMany({
    where: {
      userId,
    },
    data: {
      maxConnections: connectionLimit,
    },
  });
};