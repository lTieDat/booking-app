import { useDeferredValue, useEffect, useState } from 'react';
import type { BookingSearch } from '@booking/shared';
import { Button } from '@booking/ui';
import { Field } from '@booking/ui';
import { Input } from '@booking/ui';
import { useSearchForm } from '../hooks/use-search-form';
import type { SearchFormValues } from '../dto/search-form.dto';
import { fetchPlaceSuggestions, resolvePlaceSuggestion, type GooglePlaceSuggestion } from '../lib/google-places';

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
    setValue,
    formState: { errors, isSubmitting },
  } = useSearchForm(initialValues);
  const [destination, setDestination] = useState(
    [initialValues?.city, initialValues?.country].filter(Boolean).join(', ')
  );
  const [suggestions, setSuggestions] = useState<GooglePlaceSuggestion[]>([]);
  const [suggestionStatus, setSuggestionStatus] = useState<string | null>(null);
  const deferredDestination = useDeferredValue(destination);

  useEffect(() => {
    setDestination([initialValues?.city, initialValues?.country].filter(Boolean).join(', '));
  }, [initialValues?.city, initialValues?.country]);

  useEffect(() => {
    let ignore = false;
    const value = deferredDestination.trim();
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    fetchPlaceSuggestions(value)
      .then((items) => {
        if (ignore) return;
        setSuggestions(items);
        setSuggestionStatus(null);
      })
      .catch((error) => {
        if (ignore) return;
        setSuggestions([]);
        setSuggestionStatus(error instanceof Error ? error.message : 'Unable to load destination suggestions');
      });

    return () => {
      ignore = true;
    };
  }, [deferredDestination]);

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('city')} />
      <input type="hidden" {...register('country')} />
      <input type="hidden" {...register('lat')} />
      <input type="hidden" {...register('lng')} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Destination" error={errors.lat?.message ?? errors.city?.message} hint={suggestionStatus ?? undefined}>
          <div className="relative">
            <Input
              value={destination}
              placeholder="Da Nang, Vietnam"
              onChange={(event) => {
                setDestination(event.target.value);
                setValue('lat', '', { shouldValidate: true });
                setValue('lng', '', { shouldValidate: true });
              }}
            />
            {suggestions.length ? (
              <div className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.placeId}
                    type="button"
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    onClick={async () => {
                      const selected = await resolvePlaceSuggestion(suggestion);
                      if (!selected) return;
                      setDestination(selected.description);
                      setSuggestions([]);
                      setValue('city', selected.city, { shouldValidate: true });
                      setValue('country', selected.country, { shouldValidate: true });
                      setValue('lat', selected.lat, { shouldValidate: true });
                      setValue('lng', selected.lng, { shouldValidate: true });
                    }}
                  >
                    <span className="block text-sm font-semibold text-slate-900">{suggestion.mainText}</span>
                    <span className="block text-xs text-slate-500">{suggestion.secondaryText}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
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
