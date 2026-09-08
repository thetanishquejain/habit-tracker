import { useMemo } from 'react';
import type { HabitLog } from '../../types';
import { getDaysAgo, getToday, formatDisplayDate } from '../../utils/dateUtils';
import { getCompletionsByDate } from '../../utils/statsCalculator';
import { useIsDark } from '../../hooks/useIsDark';

const WEEKS = 18;
const DAYS = WEEKS * 7;

const LIGHT = ['#ebedf0', '#cdcbf6', '#a5a1ee', '#7c74e6', '#4f46e5'];
const DARK = ['#1f2937', '#3730a3', '#4f46e5', '#6366f1', '#818cf8'];

const shadeIndex = (count: number, max: number): number => {
  if (count === 0) return 0;
  const t = max <= 1 ? 1 : count / max;
  if (t > 0.75) return 4;
  if (t > 0.5) return 3;
  if (t > 0.25) return 2;
  return 1;
};

export const HeatmapCalendar = ({ logs }: { logs: HabitLog[] }) => {
  const isDark = useIsDark();
  const palette = isDark ? DARK : LIGHT;

  const { columns, max } = useMemo(() => {
    const start = getDaysAgo(DAYS - 1);
    const series = getCompletionsByDate(logs, start, getToday());
    const maxCount = series.reduce((m, d) => Math.max(m, d.count), 0);
    const cols: { date: string; count: number }[][] = [];
    for (let w = 0; w < WEEKS; w++) {
      cols.push(series.slice(w * 7, w * 7 + 7));
    }
    return { columns: cols, max: maxCount };
  }, [logs]);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {columns.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d) => (
              <div
                key={d.date}
                title={`${formatDisplayDate(d.date)}: ${d.count} check-in${d.count === 1 ? '' : 's'}`}
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: palette[shadeIndex(d.count, max)] }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
        <span>Less</span>
        {palette.map((c) => (
          <span key={c} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};
