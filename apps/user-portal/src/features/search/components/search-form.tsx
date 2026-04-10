import type { BookingSearch } from '@booking/shared';
import { Button } from '@booking/ui';
import { Field } from '@booking/ui';
import { Input } from '@booking/ui';
import { useSearchForm } from '../hooks/use-search-form';
import type { SearchFormValues } from '../dto/search-form.dto';

interface SearchFormProps {
  initialValues?: Partial<BookingSearch>;
  submitLabel?: string;
  className?: string;
  onSubmit: (values: SearchFormValues) => void;
}

export function SearchForm({
  initialValues,
  submitLabel = 'Search stays',
  className,
  onSubmit,
}: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useSearchForm(initialValues);

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="City" error={errors.city?.message}>
          <Input placeholder="Da Nang" {...register('city')} />
        </Field>
        <Field label="Country" error={errors.country?.message}>
          <Input placeholder="Vietnam" {...register('country')} />
        </Field>
        <Field label="Check-in" error={errors.startDate?.message}>
          <Input type="date" {...register('startDate')} />
        </Field>
        <Field label="Check-out" error={errors.endDate?.message}>
          <Input type="date" {...register('endDate')} />
        </Field>
        <Field label="Adults" error={errors.adults?.message}>
          <Input type="number" min={1} {...register('adults', { valueAsNumber: true })} />
        </Field>
        <Field label="Children" error={errors.children?.message}>
          <Input type="number" min={0} {...register('children', { valueAsNumber: true })} />
        </Field>
        <Field label="Rooms" error={errors.rooms?.message}>
          <Input type="number" min={1} {...register('rooms', { valueAsNumber: true })} />
        </Field>
        <Field label="Property name">
          <Input placeholder="Optional keyword" {...register('propertyName')} />
        </Field>
      </div>

      <div className="mt-5 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Searching...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
