import { useRewards } from '../../hooks/useRewards';
import { TIERS } from '../../utils/rewards';
import { ProgressBar } from '../ui/ProgressBar';
import { TierBadge } from './TierBadge';

export const TierProgress = () => {
  const { streak, tier, upcoming } = useRewards();

  const from = tier.minStreak;
  const to = upcoming ? upcoming.minStreak : from;
  const pct = upcoming ? ((streak - from) / (to - from)) * 100 : 100;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Your tier
          </span>
          <TierBadge tier={tier.tier} />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Best streak: <strong className="text-gray-800 dark:text-gray-200">{streak} days</strong>
        </span>
      </div>

      {upcoming ? (
        <div className="mt-3">
          <ProgressBar value={pct} />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {to - streak} more day{to - streak === 1 ? '' : 's'} of streak to reach{' '}
            <strong className="text-gray-700 dark:text-gray-200">
              {upcoming.tier}
            </strong>
          </p>
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          You're at the top tier. 🏆
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
        {TIERS.map((t) => (
          <span key={t.tier}>
            {t.tier} · {t.minStreak}d
          </span>
        ))}
      </div>
    </div>
  );
};
