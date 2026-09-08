import type { Tier } from '../../types';

const styles: Record<Tier, string> = {
  Bronze: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  Silver: 'bg-slate-200 text-slate-800 dark:bg-slate-500/20 dark:text-slate-200',
  Gold: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
  Platinum:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300',
};

export const TierBadge = ({ tier, className = '' }: { tier: Tier; className?: string }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[tier]} ${className}`}
  >
    {tier}
  </span>
);
