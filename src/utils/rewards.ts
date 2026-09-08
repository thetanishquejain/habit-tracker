import type { Habit, HabitLog, Tier } from '../types';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from './streakCalculator';

/**
 * "Consistency Coins" — an in-app currency earned from check-ins. Coins are
 * banked: they are NOT lost when a streak breaks, so slipping up costs
 * momentum but not your progress toward a reward.
 *
 * All values are derived from habit history, so the balance is always
 * reproducible from (habits, logs) minus what has been spent.
 */

export const COINS_PER_CHECKIN = 5;

// One-time bonuses the first time any habit reaches a milestone streak.
const MILESTONE_BONUS: { streak: number; coins: number }[] = [
  { streak: 7, coins: 100 },
  { streak: 30, coins: 500 },
  { streak: 100, coins: 2000 },
];

export interface TierInfo {
  tier: Tier;
  /** Minimum "best current streak" (in days) to reach this tier. */
  minStreak: number;
  accent: string; // tailwind text/bg accent
}

export const TIERS: TierInfo[] = [
  { tier: 'Bronze', minStreak: 0, accent: 'amber' },
  { tier: 'Silver', minStreak: 7, accent: 'slate' },
  { tier: 'Gold', minStreak: 21, accent: 'yellow' },
  { tier: 'Platinum', minStreak: 50, accent: 'indigo' },
];

export const tierRank = (t: Tier): number =>
  TIERS.findIndex((x) => x.tier === t);

/** Best current streak across all (non-archived) habits. */
export const bestCurrentStreak = (habits: Habit[], logs: HabitLog[]): number =>
  habits
    .filter((h) => !h.archivedAt)
    .reduce(
      (max, h) =>
        Math.max(
          max,
          calculateCurrentStreak(logs.filter((l) => l.habitId === h.id)),
        ),
      0,
    );

export const tierForStreak = (streak: number): TierInfo => {
  let current = TIERS[0];
  for (const t of TIERS) if (streak >= t.minStreak) current = t;
  return current;
};

export const nextTier = (streak: number): TierInfo | null => {
  const idx = TIERS.findIndex((t) => streak < t.minStreak);
  return idx === -1 ? null : TIERS[idx];
};

/** Total coins ever earned from habit history. */
export const coinsEarned = (habits: Habit[], logs: HabitLog[]): number => {
  const active = habits.filter((h) => !h.archivedAt);
  const checkinCoins = logs.filter((l) =>
    active.some((h) => h.id === l.habitId),
  ).length * COINS_PER_CHECKIN;

  let streakCoins = 0;
  let milestoneCoins = 0;
  for (const h of active) {
    const hLogs = logs.filter((l) => l.habitId === h.id);
    streakCoins += calculateCurrentStreak(hLogs) * 3;
    const longest = calculateLongestStreak(hLogs);
    for (const m of MILESTONE_BONUS) {
      if (longest >= m.streak) milestoneCoins += m.coins;
    }
  }
  return checkinCoins + streakCoins + milestoneCoins;
};
