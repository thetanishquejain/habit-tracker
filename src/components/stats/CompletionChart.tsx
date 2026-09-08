import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { HabitLog } from '../../types';
import { getDaysAgo, getToday, getShortMonthName } from '../../utils/dateUtils';
import { getCompletionsByDate } from '../../utils/statsCalculator';
import { useIsDark } from '../../hooks/useIsDark';

interface Props {
  logs: HabitLog[];
  days: number;
}

export const CompletionChart = ({ logs, days }: Props) => {
  const isDark = useIsDark();

  const data = useMemo(() => {
    const series = getCompletionsByDate(logs, getDaysAgo(days - 1), getToday());
    return series.map((d) => ({
      date: d.date,
      label: `${getShortMonthName(d.date)} ${Number(d.date.slice(-2))}`,
      count: d.count,
    }));
  }, [logs, days]);

  const tickStep = Math.ceil(data.length / 6);
  const grid = isDark ? '#1f2937' : '#f1f5f9';
  const axis = isDark ? '#64748b' : '#94a3b8';
  const stroke = isDark ? '#818cf8' : '#4f46e5';

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={stroke} stopOpacity={0.3} />
            <stop offset="95%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: axis }}
          interval={tickStep - 1}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: axis }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            background: isDark ? '#1e293b' : '#fff',
            color: isDark ? '#e2e8f0' : '#0f172a',
            fontSize: 12,
          }}
          labelFormatter={(l) => `${l}`}
          formatter={(v) => {
            const n = Number(v);
            return [`${n} check-in${n === 1 ? '' : 's'}`, 'Completed'];
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke={stroke}
          strokeWidth={2}
          fill="url(#fillCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
