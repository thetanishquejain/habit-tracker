import confetti from 'canvas-confetti';

/** Fire a celebratory confetti burst. Used on streak milestones. */
export const celebrate = (): void => {
  const end = Date.now() + 600;
  const colors = ['#10b981', '#3b82f6', '#a855f7', '#ec4899', '#eab308'];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
};

/** Streak values that trigger a celebration. */
export const MILESTONES = [7, 30, 100, 365];

export const isMilestone = (streak: number): boolean => MILESTONES.includes(streak);
