import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { ClaimedCoupon, Coupon } from '../types';
import { useHabits } from '../hooks/useHabits';
import * as rewardsApi from '../services/rewardsService';
import { mockCoupons } from '../data/mockCoupons';
import type { TierInfo } from '../utils/rewards';
import {
  coinsEarned,
  bestCurrentStreak,
  tierForStreak,
  nextTier,
  tierRank,
} from '../utils/rewards';

export interface RewardsContextType {
  loading: boolean;
  coupons: Coupon[];
  claims: ClaimedCoupon[];
  claimedIds: Set<string>;
  earned: number;
  spent: number;
  balance: number;
  streak: number;
  tier: TierInfo;
  upcoming: TierInfo | null;
  claim: (coupon: Coupon) => Promise<void>;
  resetClaims: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const RewardsContext = createContext<RewardsContextType | undefined>(
  undefined,
);

export const RewardsProvider = ({ children }: { children: ReactNode }) => {
  const { habits, logs } = useHabits();
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [claims, setClaims] = useState<ClaimedCoupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const [c, cl] = await Promise.all([
          rewardsApi.getCoupons(),
          rewardsApi.getClaims(),
        ]);
        if (!alive) return;
        setCoupons(c);
        setClaims(cl);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const earned = useMemo(() => coinsEarned(habits, logs), [habits, logs]);
  const spent = useMemo(
    () => claims.reduce((s, c) => s + c.coinCost, 0),
    [claims],
  );
  const balance = Math.max(0, earned - spent);
  const streak = useMemo(() => bestCurrentStreak(habits, logs), [habits, logs]);
  const tier = tierForStreak(streak);
  const upcoming = nextTier(streak);

  const claimedIds = useMemo(
    () => new Set(claims.map((c) => c.couponId)),
    [claims],
  );

  const claim = useCallback(
    async (coupon: Coupon) => {
      if (claimedIds.has(coupon.id)) return;
      if (tierRank(tier.tier) < tierRank(coupon.minTier)) {
        toast.error(`Reach ${coupon.minTier} to claim this`);
        return;
      }
      if (balance < coupon.coinCost) {
        toast.error('Not enough coins yet');
        return;
      }
      try {
        const record = await rewardsApi.claimCoupon(coupon.id);
        setClaims((prev) => [...prev, record]);
        toast.success(`Claimed ${coupon.brand} — code revealed`);
      } catch {
        toast.error('Could not claim this coupon');
      }
    },
    [balance, tier.tier, claimedIds],
  );

  const resetClaims = useCallback(async () => {
    await rewardsApi.resetClaims();
    setClaims([]);
    toast.success('Claimed rewards cleared');
  }, []);

  const value = useMemo<RewardsContextType>(
    () => ({
      loading,
      coupons,
      claims,
      claimedIds,
      earned,
      spent,
      balance,
      streak,
      tier,
      upcoming,
      claim,
      resetClaims,
    }),
    [
      loading,
      coupons,
      claims,
      claimedIds,
      earned,
      spent,
      balance,
      streak,
      tier,
      upcoming,
      claim,
      resetClaims,
    ],
  );

  return (
    <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>
  );
};
