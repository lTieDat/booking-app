import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Button } from '../../../shared/ui/button';
import { Card } from '../../../shared/ui/card';
import { Field } from '../../../shared/ui/field';
import { Select } from '../../../shared/ui/select';
import { Textarea } from '../../../shared/ui/textarea';
import type { Hotel } from '../../../shared/types/domain';
import type { ReviewFormValues } from '../dto/review-form.dto';

interface ReviewDialogProps {
  hotel: Hotel;
  existingReview: { rating?: number; reviewText?: string } | null;
  register: UseFormRegister<ReviewFormValues>;
  errors: FieldErrors<ReviewFormValues>;
  status: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: ReturnType<UseFormHandleSubmit<ReviewFormValues>>;
}

export function ReviewDialog({
  hotel,
  existingReview,
  register,
  errors,
  status,
  isSubmitting,
  onClose,
  onSubmit,
}: ReviewDialogProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4">
      <Card className="w-full max-w-xl rounded-[32px] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Review stay</p>
            <h2 className="text-2xl font-semibold text-slate-900">{hotel.HotelName}</h2>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        {existingReview ? (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-slate-500">Rating: {existingReview.rating}</p>
            <p className="text-sm leading-6 text-slate-600">{existingReview.reviewText}</p>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <Field label="Rating" error={errors.rating?.message}>
              <Select {...register('rating', { valueAsNumber: true })}>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Review" error={errors.reviewText?.message} hint="Share enough detail to help future guests.">
              <Textarea {...register('reviewText')} />
            </Field>
            {status ? <p className="text-sm font-medium text-slate-700">{status}</p> : null}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting review...' : 'Submit review'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
