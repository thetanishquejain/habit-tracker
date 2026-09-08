import type { Habit, HabitLog } from '../types';
import { formatDate, parseDate, getToday } from './dateUtils';

/**
 * Frequency model: a habit has a weekly target of 1-7 completed days.
 * A target of 7 (or an absent value, for habits created before this feature)
 * means "every day".
 */

export const DAILY_TARGET = 7;

export const effectiveTarget = (habit: Pick<Habit, 'targetPerWeek'>): number => {
  const t = habit.targetPerWeek;
  return t && t >= 1 && t <= 7 ? t : DAILY_TARGET;
};

export const isDaily = (habit: Pick<Habit, 'targetPerWeek'>): boolean =>
  effectiveTarget(habit) === DAILY_TARGET;

export const frequencyLabel = (target: number): string =>
  target >= DAILY_TARGET ? 'Every day' : `${target}\u00d7 per week`;

export const frequencyLabelShort = (target: number): string =>
  target >= DAILY_TARGET ? 'Daily' : `${target}\u00d7/week`;

/** Monday-based start of the week containing `dateStr`, as YYYY-MM-DD. */
export const getWeekStart = (dateStr: string): string => {
  const d = parseDate(dateStr);
  const dow = d.getDay(); // 0 = Sun ... 6 = Sat
  const offset = (dow + 6) % 7; // days since Monday
  d.setDate(d.getDate() - offset);
  return formatDate(d);
};

const addDays = (dateStr: string, days: number): string => {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

/** Number of days this habit was completed in the week containing `refDate`. */
export const completionsInWeek = (
  logs: HabitLog[],
  refDate: string = getToday(),
): number => {
  const start = getWeekStart(refDate);
  const end = addDays(start, 6);
  const days = new Set(
    logs
      .map((l) => l.completedDate)
      .filter((d) => d >= start && d <= end),
  );
  return days.size;
};

/**
 * Consecutive weeks (ending at the current or most recent week) in which the
 * habit met its weekly target. The current week does not break the streak
 * while it is still in progress — it only counts once the target is reached.
 */
export const calculateWeeklyStreak = (
  logs: HabitLog[],
  target: number,
  refDate: string = getToday(),
): number => {
  if (logs.length === 0 || target < 1) return 0;

  let streak = 0;
  let weekStart = getWeekStart(refDate);
  const currentWeekStart = weekStart;

  for (let i = 0; i < 520; i++) {
    const met = completionsInWeek(logs, weekStart) >= target;
    if (met) {
      streak++;
    } else if (weekStart === currentWeekStart) {
      // current week not there yet — don't count, don't break
    } else {
      break;
    }
    weekStart = addDays(weekStart, -7);
  }

  return streak;
};

/**
 * Adherence over the last `days` days, normalised to the weekly target so a
 * habit that hits its target every week reads as 100%.
 */
export const calculateAdherenceRate = (
  logs: HabitLog[],
  days: number,
  target: number,
): number => {
  const expected = (days * Math.min(target, DAILY_TARGET)) / 7;
  if (expected <= 0) return 0;
  const cutoff = formatDate(
    (() => {
      const d = parseDate(getToday());
      d.setDate(d.getDate() - (days - 1));
      return d;
    })(),
  );
  const count = logs.filter((l) => l.completedDate >= cutoff).length;
  return Math.min(100, Math.round((count / expected) * 100));
};
