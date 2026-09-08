import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Stats } from './pages/Stats';
import { HabitDetail } from './pages/HabitDetail';

function App() {
  return (
    <HabitProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/habit/:id" element={<HabitDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HabitProvider>
  );
}

export default App;
