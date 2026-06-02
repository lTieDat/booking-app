import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Button } from '@booking/ui';
import { Card } from '@booking/ui';
import { Field } from '@booking/ui';
import { Select } from '@booking/ui';
import { Textarea } from '@booking/ui';
import type { Hotel } from '@booking/shared';
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
  onHide?: () => void;
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
  onHide,
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

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          {existingReview ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Current rating: {existingReview.rating}. Update the fields below to edit this review.
            </div>
          ) : null}
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
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving review...' : existingReview ? 'Update review' : 'Submit review'}
            </Button>
            {existingReview && onHide ? (
              <Button type="button" variant="danger" onClick={onHide}>
                Hide review
              </Button>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  );
}
