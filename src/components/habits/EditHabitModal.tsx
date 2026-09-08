import type { Habit } from '../../types';
import { Modal } from '../ui/Modal';
import { HabitForm } from '../forms/HabitForm';
import { useHabits } from '../../hooks/useHabits';

interface Props {
  habit: Habit;
  open: boolean;
  onClose: () => void;
}

export const EditHabitModal = ({ habit, open, onClose }: Props) => {
  const { editHabit } = useHabits();
  return (
    <Modal open={open} onClose={onClose} title="Edit habit">
      <HabitForm
        initial={habit}
        submitLabel="Save changes"
        onCancel={onClose}
        onSubmit={async (values) => {
          await editHabit(habit.id, values);
          onClose();
        }}
      />
    </Modal>
  );
};
