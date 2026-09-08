# Habit Tracker

A habit tracking app built with React, TypeScript, Vite, and Tailwind CSS.
Create habits, check in daily, keep streaks, and review your progress with
charts and a calendar. Runs entirely in the browser on `localStorage` — no
backend, no account.

## Features

- Create, edit, and delete habits with categories
- **Daily or "N times per week"** targets (e.g. 3× per week) with matching
  streak and adherence logic
- One-tap daily check-in with streak tracking (current + longest)
- Per-habit month calendar — toggle any past day, notes indicator
- **Journal**: a short note attached to any check-in
- Stats dashboard: check-ins over time, category breakdown, GitHub-style
  activity heatmap, 30 / 60 / 90-day ranges
- Category filter, search, and sort on the dashboard
- **Dark mode** (follows your OS, with a manual toggle)
- Export data to JSON, reset to demo data, or clear everything
- Toast notifications and a confetti burst on streak milestones
- Responsive — mobile, tablet, desktop

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3
- React Router for navigation
- React Context for state
- Recharts for charts
- react-hot-toast, canvas-confetti
- ESLint (typescript-eslint, react-hooks)

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/thetanishquejain/habit-tracker.git
cd habit-tracker
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
npm run build     # type-check + production build
npm run lint      # eslint
npm run preview   # serve the production build
```

## Project structure

```
src/
├── components/
│   ├── ui/         # Button, Card, Modal, Input, Badge, Skeleton, …
│   ├── layout/     # Header, Layout, ThemeToggle
│   ├── forms/      # HabitForm
│   ├── habits/     # HabitCard, HabitList, filters, badges, modals
│   ├── checkin/    # CheckinButton, HabitCalendar, HabitJournal
│   ├── stats/      # CompletionChart, HeatmapCalendar, CategoryBreakdown
│   └── data/       # DataManagement (export / reset / clear)
├── context/        # HabitContext (habits, logs, actions)
├── hooks/          # useHabits, useTheme, useIsDark
├── pages/          # Dashboard, Stats, HabitDetail
├── services/       # mockHabitService (localStorage-backed, Promise API)
├── data/           # seed habits + generated check-in history
├── types/          # shared types
└── utils/          # date, streak, stats, frequency, colour helpers
```

## Data model

State lives in `localStorage` under `habit-tracker-habits` and
`habit-tracker-logs`. The service layer (`src/services/mockHabitService.ts`)
mimics an async REST API, so swapping in a real backend later is mostly a
matter of replacing that one file.

## License

MIT
