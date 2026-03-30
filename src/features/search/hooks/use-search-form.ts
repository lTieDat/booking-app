import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { BookingSearch } from '../../../shared/types/domain';
import {
  bookingSearchSchema,
  createSearchFormDefaults,
  type SearchFormValues,
} from '../dto/search-form.dto';

export function useSearchForm(initialValues?: Partial<BookingSearch>) {
  const defaultValues = useMemo<SearchFormValues>(
    () => createSearchFormDefaults(initialValues),
    [initialValues]
  );

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(bookingSearchSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return form;
}
