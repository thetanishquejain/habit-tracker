import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { Habit, HabitLog, Category } from '../../types';
import { calculateCompletionsByCategory } from '../../utils/statsCalculator';
import { getCategoryHexColor } from '../../utils/colorUtils';
import { EmptyState } from '../ui/EmptyState';
import { useIsDark } from '../../hooks/useIsDark';

interface Props {
  habits: Habit[];
  logs: HabitLog[];
}

export const CategoryBreakdown = ({ habits, logs }: Props) => {
  const isDark = useIsDark();
  const data = useMemo(
    () => calculateCompletionsByCategory(habits, logs).filter((d) => d.count > 0),
    [habits, logs],
  );

  if (data.length === 0) {
    return <EmptyState title="No check-ins yet" message="Complete a habit to see the breakdown." />;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
          stroke={isDark ? '#0f172a' : '#fff'}
        >
          {data.map((d) => (
            <Cell key={d.category} fill={getCategoryHexColor(d.category as Category)} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            background: isDark ? '#1e293b' : '#fff',
            color: isDark ? '#e2e8f0' : '#0f172a',
            fontSize: 12,
          }}
          formatter={(v, n) => [`${Number(v)} check-ins`, String(n)]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: isDark ? '#94a3b8' : '#475569' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
