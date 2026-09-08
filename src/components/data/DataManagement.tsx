import { useState } from 'react';
import toast from 'react-hot-toast';
import { useHabits } from '../../hooks/useHabits';
import { exportData } from '../../services/mockHabitService';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { getToday } from '../../utils/dateUtils';

export const DataManagement = () => {
  const { resetData, clearData } = useHabits();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `habit-tracker-${getToday()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Exported to JSON');
    } catch {
      toast.error('Export failed');
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onClick={handleExport}>
        Export JSON
      </Button>
      <Button variant="secondary" size="sm" onClick={resetData}>
        Reset to demo data
      </Button>
      <Button variant="danger" size="sm" onClick={() => setConfirmClear(true)}>
        Clear all data
      </Button>

      <Modal
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        title="Clear all data"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmClear(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                await clearData();
                setConfirmClear(false);
              }}
            >
              Clear everything
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This removes every habit and check-in from this browser. Export first if
          you want a backup.
        </p>
      </Modal>
    </div>
  );
};
