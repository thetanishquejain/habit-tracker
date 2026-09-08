import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';
import { RewardsProvider } from './context/RewardsContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Stats } from './pages/Stats';
import { HabitDetail } from './pages/HabitDetail';
import { Rewards } from './pages/Rewards';

function App() {
  return (
    <HabitProvider>
      <RewardsProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/habit/:id" element={<HabitDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </RewardsProvider>
    </HabitProvider>
  );
}

export default App;
