import { Modal } from '../ui/Modal';
import { HabitForm } from '../forms/HabitForm';
import { useHabits } from '../../hooks/useHabits';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateHabitModal = ({ open, onClose }: Props) => {
  const { addHabit } = useHabits();
  return (
    <Modal open={open} onClose={onClose} title="New habit">
      <HabitForm
        submitLabel="Create habit"
        onCancel={onClose}
        onSubmit={async (values) => {
          await addHabit(values);
          onClose();
        }}
      />
    </Modal>
  );
};
