import type { ClaimedCoupon } from '../types';
import { mockCoupons } from '../data/mockCoupons';

const CLAIMS_KEY = 'habit-tracker-claims';
const API_DELAY = 250;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const read = (): ClaimedCoupon[] => {
  try {
    const raw = localStorage.getItem(CLAIMS_KEY);
    return raw ? (JSON.parse(raw) as ClaimedCoupon[]) : [];
  } catch {
    return [];
  }
};

const write = (claims: ClaimedCoupon[]) => {
  try {
    localStorage.setItem(CLAIMS_KEY, JSON.stringify(claims));
  } catch {
    // ignore
  }
};

export const getCoupons = async () => {
  await delay(API_DELAY);
  return mockCoupons;
};

export const getClaims = async (): Promise<ClaimedCoupon[]> => {
  await delay(API_DELAY);
  return read();
};

export const claimCoupon = async (
  couponId: string,
): Promise<ClaimedCoupon> => {
  await delay(API_DELAY);
  const coupon = mockCoupons.find((c) => c.id === couponId);
  if (!coupon) throw new Error('Unknown coupon');

  const claims = read();
  if (claims.some((c) => c.couponId === couponId)) {
    throw new Error('Already claimed');
  }
  const claim: ClaimedCoupon = {
    couponId,
    code: coupon.code,
    claimedAt: new Date().toISOString(),
    coinCost: coupon.coinCost,
  };
  write([...claims, claim]);
  return claim;
};

export const resetClaims = async () => {
  await delay(API_DELAY);
  write([]);
};
