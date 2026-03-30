import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  checkoutFormSchema,
  createCheckoutFormDefaults,
  type CheckoutFormValues,
} from '../dto/checkout-form.dto';

export function useCheckoutForm(defaultPhonePrefix = '+84') {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: createCheckoutFormDefaults(defaultPhonePrefix),
  });

  useEffect(() => {
    form.reset(createCheckoutFormDefaults(defaultPhonePrefix));
  }, [defaultPhonePrefix, form]);

  return form;
}
