import { z } from 'zod';

export const arrivalTimeOptions = [
  "I don't know yet",
  '00:00-02:00',
  '02:00-04:00',
  '04:00-06:00',
  '06:00-08:00',
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
  '22:00-00:00',
] as const;

export const checkoutFormSchema = z.object({
  customerName: z.string().trim().min(1, 'Full name is required'),
  customerEmail: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  country: z.string().trim().min(1, 'Country is required'),
  phonePrefix: z.string().trim().min(1, 'Phone prefix is required'),
  phoneNo: z
    .string()
    .trim()
    .min(6, 'Phone number is required')
    .regex(/^[0-9]+$/, 'Phone number should contain digits only'),
  arrivalTime: z.enum(arrivalTimeOptions, {
    error: 'Arrival time is required',
  }),
  airportShuttle: z.boolean(),
  rentalCar: z.boolean(),
  taxiShuttle: z.boolean(),
  specialRequest: z.string().trim().max(500, 'Keep special requests under 500 characters'),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export interface UpdateBookingRequestDto {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  phoneNo: string;
  country: string;
  finalPrice: number;
  arrivalTime: CheckoutFormValues['arrivalTime'];
  airportShuttle: boolean;
  rentalCar: boolean;
  taxiShuttle: boolean;
  specialRequest: string;
}

export function createCheckoutFormDefaults(defaultPhonePrefix = '+84'): CheckoutFormValues {
  return {
    customerName: '',
    customerEmail: '',
    country: '',
    phonePrefix: defaultPhonePrefix,
    phoneNo: '',
    arrivalTime: "I don't know yet",
    airportShuttle: false,
    rentalCar: false,
    taxiShuttle: false,
    specialRequest: '',
  };
}

export function toUpdateBookingRequestDto(
  bookingId: string,
  finalPrice: number,
  values: CheckoutFormValues
): UpdateBookingRequestDto {
  return {
    bookingId,
    customerName: values.customerName,
    customerEmail: values.customerEmail,
    phoneNo: `${values.phonePrefix}${values.phoneNo}`,
    country: values.country,
    finalPrice: Number(finalPrice.toFixed(2)),
    arrivalTime: values.arrivalTime,
    airportShuttle: values.airportShuttle,
    rentalCar: values.rentalCar,
    taxiShuttle: values.taxiShuttle,
    specialRequest: values.specialRequest,
  };
}
