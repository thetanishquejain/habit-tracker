# Habit Tracker - Project TODO

## Project Overview
Build a frontend prototype for a habit tracker application using React (TypeScript) + Vite with Tailwind CSS. Use dummy/mock data to demonstrate all features. Backend API integration will be added later.

## Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API + useState/useReducer
- **Data**: Mock/dummy data (simulating API responses)
- **Charts**: Recharts or Chart.js for analytics
- **Dev Tools**: ESLint, Prettier

---

## Milestone 1: Project Setup & Mock Data ✅

**Goal**: Initialize Vite + React + TypeScript project with Tailwind CSS and mock data structure

### Tasks:
- [x] Initialize Vite Project
  - [x] Create React + TypeScript project with Vite
  - [x] Clean up default Vite template files
  - [x] Set up folder structure: components, pages, hooks, types, data, utils

- [x] Configure Tailwind CSS
  - [x] Install Tailwind CSS and dependencies
  - [x] Configure `tailwind.config.js` with custom theme colors
  - [x] Set up `postcss.config.js`
  - [x] Create base styles in `src/index.css`
  - [x] Add custom design tokens (colors for habit categories)

- [x] TypeScript Type Definitions
  - [x] Define `Habit` interface (id, name, description, category, color, createdAt)
  - [x] Define `HabitLog` interface (id, habitId, completedDate, notes)
  - [x] Define `HabitStats` interface (currentStreak, longestStreak, completionRate, totalCompletions)
  - [x] Define `Category` type for habit categories

- [x] Create Mock Data
  - [x] `src/data/mockHabits.ts` - Array of sample habits with various categories
  - [x] `src/data/mockLogs.ts` - Sample completion logs for the past 90 days
  - [x] Utility functions to generate realistic dummy data
  - [x] Include variety: some habits with long streaks, some new, some inconsistent

- [x] Initialize Git
  - [x] Create `.gitignore`
  - [x] Initial commit with project setup

**Status**: ✅ COMPLETED

---

## Milestone 2: State Management & Mock Service Layer

**Goal**: Create state management system and mock API services

### Tasks:
- [x] Mock Service Layer
  - [x] Create `src/services/mockHabitService.ts`
  - [x] Implement getHabits() function
  - [x] Implement getHabit(id) function
  - [x] Implement createHabit() function
  - [x] Implement updateHabit() function
  - [x] Implement deleteHabit() function
  - [x] Implement logCompletion() function
  - [x] Implement removeCompletion() function
  - [x] Implement getHabitLogs() function
  - [x] Implement getHabitStats() function
  - [x] Add setTimeout to simulate API latency
  - [x] Return Promises for all functions

- [ ] State Management Setup
  - [ ] Create `src/context/HabitContext.tsx`
  - [ ] Set up Context with habits list state
  - [ ] Set up selected habit state
  - [ ] Set up loading states
  - [ ] Set up error states
  - [ ] Implement add habit action
  - [ ] Implement update habit action
  - [ ] Implement delete habit action
  - [ ] Implement archive habit action
  - [ ] Implement log completion action
  - [ ] Implement remove completion action
  - [ ] Create `src/hooks/useHabits.ts` custom hook

- [x] Utility Functions
  - [x] Create `src/utils/streakCalculator.ts`
    - [x] Implement calculateCurrentStreak()
    - [x] Implement calculateLongestStreak()
  - [x] Create `src/utils/statsCalculator.ts`
    - [x] Implement calculateCompletionRate()
    - [x] Implement calculateTotalCompletions()
  - [x] Create `src/utils/dateUtils.ts`
    - [x] Implement date formatting helpers
    - [x] Implement date comparison helpers
    - [x] Implement isToday() helper
    - [x] Implement getDaysAgo() helper
  - [x] Create `src/utils/colorUtils.ts`
    - [x] Implement color generation for categories

- [x] LocalStorage Persistence
  - [x] Implement save to localStorage on habit changes
  - [x] Implement load from localStorage on app init
  - [x] Initialize with mock data if localStorage is empty
  - [x] Handle localStorage errors gracefully

**Status**: 🚧 IN PROGRESS (Mock service layer and utilities completed, state management pending)

---

## Milestone 3: Core UI Components & Layout

**Goal**: Build reusable UI components and app layout with Tailwind CSS

### Tasks:
- [ ] Layout Components
  - [ ] Create `src/components/layout/Header.tsx`
    - [ ] Add app title
    - [ ] Add navigation links
  - [ ] Create `src/components/layout/Layout.tsx`
    - [ ] Main layout wrapper with header
  - [ ] Implement responsive design (mobile-first)

- [ ] Common UI Components
  - [ ] Create `src/components/ui/Button.tsx`
    - [ ] Implement primary variant
    - [ ] Implement secondary variant
    - [ ] Implement danger variant
    - [ ] Add hover states
    - [ ] Add disabled state
  - [ ] Create `src/components/ui/Card.tsx`
    - [ ] Card container with padding
    - [ ] Shadow and border styling
  - [ ] Create `src/components/ui/Modal.tsx`
    - [ ] Modal overlay
    - [ ] Modal content container
    - [ ] Close button
    - [ ] Click outside to close
    - [ ] Escape key to close
  - [ ] Create `src/components/ui/Input.tsx`
    - [ ] Text input styling
    - [ ] Error state styling
    - [ ] Label component
  - [ ] Create `src/components/ui/Badge.tsx`
    - [ ] Category badge styling
    - [ ] Streak badge styling
  - [ ] Create `src/components/ui/LoadingSpinner.tsx`
    - [ ] Spinner animation

- [ ] Form Components
  - [ ] Create `src/components/forms/HabitForm.tsx`
    - [ ] Name input field
    - [ ] Description textarea
    - [ ] Category selector dropdown
    - [ ] Form validation
    - [ ] Error messages display
    - [ ] Submit button

- [ ] Tailwind Theme Configuration
  - [ ] Verify custom colors for categories
  - [ ] Set custom spacing if needed
  - [ ] Set custom border radius
  - [ ] Configure typography scale

**Status**: ⏳ PENDING

---

## Milestone 4: Habit List & Management Features

**Goal**: Implement habit viewing, creation, editing, and organization

### Tasks:
- [ ] Habit Display Components
  - [ ] Create `src/components/habits/HabitList.tsx`
    - [ ] Grid layout for habit cards
    - [ ] Responsive grid columns
  - [ ] Create `src/components/habits/HabitCard.tsx`
    - [ ] Display habit name
    - [ ] Display category badge
    - [ ] Display color accent
    - [ ] Display streak badge
    - [ ] Add hover effects
    - [ ] Add click handler
  - [ ] Create empty state component
    - [ ] "No habits yet" message
    - [ ] Create habit button

- [ ] Habit Management
  - [ ] Create `src/components/habits/CreateHabitModal.tsx`
    - [ ] Integrate HabitForm
    - [ ] Handle form submission
    - [ ] Close modal on success
  - [ ] Create `src/components/habits/EditHabitModal.tsx`
    - [ ] Pre-populate form with habit data
    - [ ] Handle form submission
    - [ ] Close modal on success
  - [ ] Create `src/components/habits/DeleteConfirmModal.tsx`
    - [ ] Confirmation message
    - [ ] Delete button
    - [ ] Cancel button
  - [ ] Add floating action button (FAB) for creating habits

- [ ] Filtering & Organization
  - [ ] Create `src/components/habits/CategoryFilter.tsx`
    - [ ] "All" filter chip
    - [ ] Category filter chips
    - [ ] Active state styling
  - [ ] Implement filter logic in context
  - [ ] Add sort dropdown
    - [ ] Sort by name (A-Z)
    - [ ] Sort by streak (highest first)
    - [ ] Sort by creation date
  - [ ] Add search/filter input
    - [ ] Filter by name

- [ ] Dashboard Page
  - [ ] Create `src/pages/Dashboard.tsx`
    - [ ] Add category filter bar
    - [ ] Add create habit button
    - [ ] Render HabitList
    - [ ] Implement responsive grid layout
  - [ ] Update App.tsx to render Dashboard

**Status**: ⏳ PENDING

---

## Milestone 5: Daily Check-ins & Streak Tracking

**Goal**: Implement core habit tracking functionality

### Tasks:
- [ ] Check-in Components
  - [ ] Create `src/components/checkin/CheckinButton.tsx`
    - [ ] Checkbox/circular button UI
    - [ ] Toggle completion for today
    - [ ] Visual feedback on click (animation)
    - [ ] Color change when checked
    - [ ] Optimistic UI updates
    - [ ] Handle errors

- [ ] Streak Display
  - [ ] Create `src/components/habits/StreakBadge.tsx`
    - [ ] Show current streak number
    - [ ] Add fire icon (or emoji 🔥)
    - [ ] Highlight 7+ day streaks
    - [ ] Highlight 30+ day streaks
    - [ ] Show longest streak as tooltip/secondary text
  - [ ] Integrate StreakBadge into HabitCard

- [ ] Calendar View
  - [ ] Create `src/components/checkin/HabitCalendar.tsx`
    - [ ] Monthly calendar grid layout
    - [ ] Day headers (M, T, W, T, F, S, S)
    - [ ] Render days for current month
    - [ ] Color code completed days (green)
    - [ ] Color code incomplete days (gray)
    - [ ] Disable future dates
    - [ ] Month navigation (prev/next)
    - [ ] Click date to toggle completion (past dates only)

- [ ] Today's View Enhancement
  - [ ] Add "Today's Habits" section to Dashboard
  - [ ] Filter to show only today's habits
  - [ ] Add quick check-in buttons
  - [ ] Add progress bar (X of Y completed)
  - [ ] Add encouraging message when all complete
    - [ ] "Great job! All habits completed today! 🎉"

**Status**: ⏳ PENDING

---

## Milestone 6: Statistics & Analytics

**Goal**: Provide insights and visualizations on habit progress

### Tasks:
- [ ] Choose & Configure Charting Library
  - [ ] Install Recharts (or Chart.js)
  - [ ] Create wrapper components for charts
  - [ ] Configure responsive chart sizing
  - [ ] Style charts to match app theme

- [ ] Stats Calculation
  - [ ] Enhance `src/utils/statsCalculator.ts`
    - [ ] Calculate 7-day completion rate
    - [ ] Calculate 30-day completion rate
    - [ ] Calculate 90-day completion rate
    - [ ] Calculate total completions
    - [ ] Calculate active days
    - [ ] Calculate best day of week
    - [ ] Find best performing habit

- [ ] Chart Components
  - [ ] Create `src/components/stats/CompletionChart.tsx`
    - [ ] Line chart showing completions over time
    - [ ] X-axis: dates
    - [ ] Y-axis: number of completions
    - [ ] Responsive sizing
  - [ ] Create `src/components/stats/HeatmapCalendar.tsx`
    - [ ] GitHub-style contribution heatmap
    - [ ] Color intensity based on completions
    - [ ] Tooltip showing count on hover
  - [ ] Create `src/components/stats/CategoryBreakdown.tsx`
    - [ ] Pie or donut chart by category
    - [ ] Show percentage per category
  - [ ] Add date range selector (30/60/90 days)

- [ ] Stats Dashboard
  - [ ] Create `src/pages/Stats.tsx`
    - [ ] Overview cards section
      - [ ] Total habits card
      - [ ] Total check-ins card
      - [ ] Average completion rate card
      - [ ] Longest streak card
    - [ ] Render CompletionChart
    - [ ] Render HeatmapCalendar
    - [ ] Render CategoryBreakdown
  - [ ] Add navigation link to Stats page

- [ ] Habit Detail Page
  - [ ] Create `src/pages/HabitDetail.tsx`
    - [ ] Display habit info (name, description, category)
    - [ ] Show HabitCalendar for this habit
    - [ ] Show stats cards for this habit
    - [ ] Show completion chart for this habit
    - [ ] Add edit button
    - [ ] Add delete button
  - [ ] Set up routing to habit detail page

**Status**: ⏳ PENDING

---

## Milestone 7: Polish & Final Touches

**Goal**: Enhance UX with animations, notifications, and finishing touches

### Tasks:
- [ ] Toast Notifications
  - [ ] Install react-hot-toast
  - [ ] Configure Toaster component
  - [ ] Add success toast: "Habit created!"
  - [ ] Add success toast: "Habit updated!"
  - [ ] Add success toast: "Habit deleted!"
  - [ ] Add success toast: "Check-in recorded!"
  - [ ] Add error toasts for failures
  - [ ] Style toasts to match app theme

- [ ] Animations & Transitions
  - [ ] Add Tailwind transitions to buttons
  - [ ] Add modal fade-in/out animations
  - [ ] Animate habit card hover states
  - [ ] Add check-in button click animation
  - [ ] Celebrate streak milestones
    - [ ] Add confetti effect for day 7, 30, 100
  - [ ] Add smooth page transitions
  - [ ] Create loading skeleton components
    - [ ] Habit card skeleton
    - [ ] Stats card skeleton

- [ ] Empty States
  - [ ] "No habits yet" state on Dashboard
    - [ ] Friendly message
    - [ ] Large create button
  - [ ] "No check-ins this month" in calendar
  - [ ] "No stats to show" with motivational message

- [ ] Responsive Design Polish
  - [ ] Test on mobile viewport
  - [ ] Test on tablet viewport
  - [ ] Test on desktop viewport
  - [ ] Adjust grid layouts for breakpoints
  - [ ] Make navigation mobile-friendly
  - [ ] Ensure touch-friendly button sizes (min 44x44px)

- [ ] Accessibility Improvements
  - [ ] Keyboard navigation for modals
    - [ ] Tab through interactive elements
    - [ ] Focus trap in modal
  - [ ] Add focus states for all interactive elements
  - [ ] Add ARIA labels for icon-only buttons
  - [ ] Use semantic HTML
    - [ ] Proper heading hierarchy
    - [ ] Use `<button>` for buttons
    - [ ] Use `<nav>` for navigation
  - [ ] Test with screen reader

- [ ] Data Management
  - [ ] Add "Clear all data" option
    - [ ] Confirmation dialog
    - [ ] Clear localStorage
  - [ ] Add "Reset to demo data" option
    - [ ] Load mock data
    - [ ] Save to localStorage
  - [ ] Implement export habits as JSON
    - [ ] Generate JSON file
    - [ ] Trigger download
  - [ ] Implement import habits from JSON (future-proof)
    - [ ] File input
    - [ ] Parse JSON
    - [ ] Validate data
    - [ ] Load into app

**Status**: ⏳ PENDING

---

## Project Structure

```
/habit-tracker
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .gitignore
├── README.md
├── TODO.md                             # This file
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   │
│   ├── types/
│   │   └── index.ts                    ✅ DONE
│   │
│   ├── data/
│   │   ├── mockHabits.ts               ✅ DONE
│   │   └── mockLogs.ts                 ✅ DONE
│   │
│   ├── context/
│   │   └── HabitContext.tsx
│   │
│   ├── services/
│   │   └── mockHabitService.ts         ✅ DONE
│   │
│   ├── utils/
│   │   ├── streakCalculator.ts         ✅ DONE
│   │   ├── statsCalculator.ts          ✅ DONE
│   │   ├── dateUtils.ts                ✅ DONE
│   │   └── colorUtils.ts               ✅ DONE
│   │
│   ├── hooks/
│   │   └── useHabits.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   ├── forms/
│   │   │   └── HabitForm.tsx
│   │   │
│   │   ├── habits/
│   │   │   ├── HabitList.tsx
│   │   │   ├── HabitCard.tsx
│   │   │   ├── CreateHabitModal.tsx
│   │   │   ├── EditHabitModal.tsx
│   │   │   ├── DeleteConfirmModal.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── StreakBadge.tsx
│   │   │
│   │   ├── checkin/
│   │   │   ├── CheckinButton.tsx
│   │   │   └── HabitCalendar.tsx
│   │   │
│   │   └── stats/
│   │       ├── CompletionChart.tsx
│   │       ├── HeatmapCalendar.tsx
│   │       └── CategoryBreakdown.tsx
│   │
│   └── pages/
│       ├── Dashboard.tsx
│       ├── HabitDetail.tsx
│       └── Stats.tsx
```

---

## Future Enhancements (Phase 2 - Backend Integration)
- [ ] Replace mock service with real Express API
- [ ] Integrate PostgreSQL database
- [ ] User authentication (JWT, session management)
- [ ] Multi-user support with user accounts
- [ ] Habit reminders/notifications
- [ ] Mobile app (React Native)
- [ ] Habit templates/presets
- [ ] Social features (share progress, friends)
- [ ] Custom habit frequencies (3x/week, etc.)
- [ ] Notes/journal entries with completions
- [ ] Dark mode toggle
- [ ] Gamification (badges, achievements, points)

---

## Getting Started

To start development:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

---

## Progress Summary

- ✅ Milestone 1: Project Setup & Mock Data (COMPLETED)
- ✅ Milestone 2: State Management & Mock Service Layer (COMPLETED)
- ✅ Milestone 3: Core UI Components & Layout (COMPLETED)
- ✅ Milestone 4: Habit List & Management Features (COMPLETED)
- ✅ Milestone 5: Daily Check-ins & Streak Tracking (COMPLETED)
- ✅ Milestone 6: Statistics & Analytics (COMPLETED)
- ✅ Milestone 7: Polish & Final Touches (COMPLETED)

### Implementation notes (UI build)

- State: `src/context/HabitContext.tsx` + `src/hooks/useHabits.ts`
- Routing: `react-router-dom` — `/` (Dashboard), `/stats` (Stats), `/habit/:id` (HabitDetail)
- Charts: `recharts` — area chart, donut, GitHub-style heatmap
- Notifications: `react-hot-toast`; milestone confetti via `canvas-confetti`
- Fixed a timezone bug in `formatDate` (was using `toISOString`, shifting the
  calendar day for non-UTC users)
