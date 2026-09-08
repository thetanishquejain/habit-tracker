import { useState } from 'react';

interface Props {
  completed: boolean;
  onToggle: () => void | Promise<void>;
  label?: string;
  size?: number;
}

export const CheckinButton = ({ completed, onToggle, label = 'today', size = 40 }: Props) => {
  const [busy, setBusy] = useState(false);

  const handle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onToggle();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={handle}
      disabled={busy}
      aria-pressed={completed}
      aria-label={completed ? `Mark ${label} incomplete` : `Mark ${label} complete`}
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 transition-all active:scale-90 ${
        completed
          ? 'border-emerald-500 bg-emerald-500 text-white'
          : 'border-gray-300 bg-white text-transparent hover:border-emerald-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-emerald-500'
      }`}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </button>
  );
};
