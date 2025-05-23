import { requireNodeEnvVar } from '../server/utils';

export type SubscriptionStatus = 'past_due' | 'cancel_at_period_end' | 'active' | 'deleted';

export enum PaymentPlanId {
  Hobby = 'hobby',
  Startup = 'startup',
  Scale = 'scale'
}

export interface PaymentPlan {
  // Returns the id under which this payment plan is identified on your payment processor. 
  // E.g. this might be price id on Stripe, or variant id on LemonSqueezy.
  getPaymentProcessorPlanId: () => string;
  effect: PaymentPlanEffect;
  connectionLimit: number;
  dailyMessageLimit: number;
  price: number;
}

export type PaymentPlanEffect = { kind: 'subscription' } | { kind: 'credits'; amount: number };

export const paymentPlans: Record<PaymentPlanId, PaymentPlan> = {
  [PaymentPlanId.Hobby]: {
    getPaymentProcessorPlanId: () => requireNodeEnvVar('PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID'),
    effect: { kind: 'subscription' },
    price: 0,
    connectionLimit: 100,
    dailyMessageLimit: 200000,
  },
  [PaymentPlanId.Startup]: {
    getPaymentProcessorPlanId: () => requireNodeEnvVar('PAYMENTS_STARTUP_SUBSCRIPTION_PLAN_ID'),
    effect: { kind: 'subscription' },
    price: 39.99,
    connectionLimit: 1000,
    dailyMessageLimit: 1000000,
  },
  [PaymentPlanId.Scale]: {
    getPaymentProcessorPlanId: () => requireNodeEnvVar('PAYMENTS_SCALE_SUBSCRIPTION_PLAN_ID'),
    effect: { kind: 'subscription' },
    price: 99.99,
    connectionLimit: 3000,
    dailyMessageLimit: 6000000,
  },
};

export function prettyPaymentPlanName(planId: PaymentPlanId): string {
  const planToName: Record<PaymentPlanId, string> = {
    [PaymentPlanId.Hobby]: 'Hobby',
    [PaymentPlanId.Startup]: 'Startup',
    [PaymentPlanId.Scale]: 'Scale',
  };
  return planToName[planId];
}

export function parsePaymentPlanId(planId: string): PaymentPlanId {
  if ((Object.values(PaymentPlanId) as string[]).includes(planId)) {
    return planId as PaymentPlanId;
  } else {
    throw new Error(`Invalid PaymentPlanId: ${planId}`);
  }
}

export function getSubscriptionPaymentPlanIds(): PaymentPlanId[] {
  return Object.values(PaymentPlanId).filter((planId) => paymentPlans[planId].effect.kind === 'subscription');
}

export function getPlansConnectionLimit(planId: PaymentPlanId): number {
  return paymentPlans[planId].connectionLimit;
}
