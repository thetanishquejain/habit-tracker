import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Coupon } from '../../types';
import { useRewards } from '../../hooks/useRewards';
import { tierRank, TIERS } from '../../utils/rewards';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { TierBadge } from './TierBadge';
import { CoinIcon } from './CoinIcon';

export const CouponCard = ({ coupon }: { coupon: Coupon }) => {
  const { balance, tier, claim, claims, claimedIds } = useRewards();
  const [confirming, setConfirming] = useState(false);

  const claimed = claimedIds.has(coupon.id);
  const claimRecord = claims.find((c) => c.couponId === coupon.id);
  const tierOk = tierRank(tier.tier) >= tierRank(coupon.minTier);
  const canAfford = balance >= coupon.coinCost;
  const minStreak =
    TIERS.find((t) => t.tier === coupon.minTier)?.minStreak ?? 0;

  return (
    <div
      className={`flex flex-col rounded-xl border bg-white p-5 shadow-sm transition dark:bg-gray-900 ${
        claimed
          ? 'border-emerald-300 dark:border-emerald-700'
          : 'border-gray-200 dark:border-gray-800'
      } ${!tierOk ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {coupon.brand}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {coupon.category}
          </p>
        </div>
        <TierBadge tier={coupon.minTier} />
      </div>

      <p className="mt-3 text-base font-bold text-gray-900 dark:text-gray-100">
        {coupon.title}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {coupon.description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
        <CoinIcon size={16} />
        {coupon.coinCost.toLocaleString()}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
        {claimed && claimRecord ? (
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500">Your code</p>
            <div className="mt-1 flex items-center gap-2">
              <code className="rounded-md bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                {claimRecord.code}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(claimRecord.code);
                  toast.success('Code copied');
                }}
                className="text-xs text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Expires: {coupon.expiresLabel}
            </p>
          </div>
        ) : !tierOk ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🔒 Reach a {minStreak}-day streak ({coupon.minTier})
          </p>
        ) : (
          <Button
            className="w-full"
            disabled={!canAfford}
            onClick={() => setConfirming(true)}
          >
            {canAfford
              ? 'Claim'
              : `Need ${(coupon.coinCost - balance).toLocaleString()} more coins`}
          </Button>
        )}
      </div>

      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        title={`Claim ${coupon.brand}?`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await claim(coupon);
                setConfirming(false);
              }}
            >
              Spend {coupon.coinCost.toLocaleString()} coins
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This spends{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {coupon.coinCost.toLocaleString()} coins
          </span>{' '}
          and reveals your <span className="font-semibold">{coupon.title}</span>{' '}
          code from {coupon.brand}. Coupons can only be claimed once.
        </p>
      </Modal>
    </div>
  );
};
