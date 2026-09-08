import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Category, Habit } from '../../types';
import { CATEGORY_COLORS } from '../../types';
import { effectiveTarget, frequencyLabel, DAILY_TARGET } from '../../utils/frequency';
import { Input, Textarea, Select, Label, FieldError } from '../ui/Input';
import { Button } from '../ui/Button';

const CATEGORIES: Category[] = [
  'Health',
  'Fitness',
  'Productivity',
  'Learning',
  'Mindfulness',
  'Social',
  'Other',
];

const TARGETS = [7, 6, 5, 4, 3, 2, 1];

export interface HabitFormValues {
  name: string;
  description: string;
  category: Category;
  color: string;
  targetPerWeek: number;
}

interface Props {
  initial?: Habit;
  submitLabel: string;
  onSubmit: (values: HabitFormValues) => void | Promise<void>;
  onCancel: () => void;
}

export const HabitForm = ({ initial, submitLabel, onSubmit, onCancel }: Props) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'Health');
  const [target, setTarget] = useState<number>(
    initial ? effectiveTarget(initial) : DAILY_TARGET,
  );
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setErrors({ name: 'Name must be at least 2 characters' });
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit({
        name: trimmed,
        description: description.trim(),
        category,
        color: CATEGORY_COLORS[category],
        targetPerWeek: target,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="habit-name">Name</Label>
        <Input
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Morning run"
          error={!!errors.name}
          autoFocus
        />
        <FieldError>{errors.name}</FieldError>
      </div>

      <div>
        <Label htmlFor="habit-desc">Description</Label>
        <Textarea
          id="habit-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional — what does completing this look like?"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="habit-category">Category</Label>
          <Select
            id="habit-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="habit-target">How often?</Label>
          <Select
            id="habit-target"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          >
            {TARGETS.map((t) => (
              <option key={t} value={t}>
                {frequencyLabel(t)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
