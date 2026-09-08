import { useMemo } from 'react';
import { useRewards } from '../hooks/useRewards';
import { CouponCard } from '../components/rewards/CouponCard';
import { TierProgress } from '../components/rewards/TierProgress';
import { CoinBalance } from '../components/rewards/CoinBalance';
import { CoinIcon } from '../components/rewards/CoinIcon';
import { COINS_PER_CHECKIN } from '../utils/rewards';
import { Card } from '../components/ui/Card';
import { HabitCardSkeleton } from '../components/ui/Skeleton';

export const Rewards = () => {
  const { loading, coupons, earned, spent, balance, claims, resetClaims } =
    useRewards();

  const sorted = useMemo(
    () => [...coupons].sort((a, b) => a.coinCost - b.coinCost),
    [coupons],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Rewards
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Earn Consistency Coins from check-ins. Higher streaks unlock better
            brand coupons.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-right shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs text-gray-400 dark:text-gray-500">Balance</p>
          <CoinBalance balance={balance} />
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
        Demo feature — brands and codes are fictional. Real partner coupons need
        a backend and brand deals.
      </div>

      <TierProgress />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Coins earned
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-2xl font-bold text-gray-900 dark:text-gray-100">
            <CoinIcon size={20} />
            {earned.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            +{COINS_PER_CHECKIN} per check-in, plus streak &amp; milestone bonuses
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Coins spent
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {spent.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {claims.length} coupon{claims.length === 1 ? '' : 's'} claimed
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Available
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {balance.toLocaleString()}
          </p>
          {claims.length > 0 && (
            <button
              onClick={resetClaims}
              className="mt-1 text-xs text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Reset claimed rewards
            </button>
          )}
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
          Coupon store
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <HabitCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((c) => (
              <CouponCard key={c.id} coupon={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
