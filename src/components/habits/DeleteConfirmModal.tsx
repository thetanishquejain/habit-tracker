import { useNavigate } from 'react-router-dom';
import type { Habit } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useHabits } from '../../hooks/useHabits';

interface Props {
  habit: Habit;
  open: boolean;
  onClose: () => void;
  redirectHome?: boolean;
}

export const DeleteConfirmModal = ({ habit, open, onClose, redirectHome }: Props) => {
  const { removeHabit } = useHabits();
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete habit"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await removeHabit(habit.id);
              onClose();
              if (redirectHome) navigate('/');
            }}
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-600">
        Delete <span className="font-semibold text-gray-900">{habit.name}</span> and
        all of its check-in history? This can't be undone.
      </p>
    </Modal>
  );
};
