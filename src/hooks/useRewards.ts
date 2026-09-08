import { useContext } from 'react';
import { RewardsContext } from '../context/RewardsContext';
import type { RewardsContextType } from '../context/RewardsContext';

/** Access the rewards store. Must be used within <RewardsProvider>. */
export const useRewards = (): RewardsContextType => {
  const ctx = useContext(RewardsContext);
  if (!ctx) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return ctx;
};
