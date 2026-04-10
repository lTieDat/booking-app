import { useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CheckoutGuestFormCard } from '../components/checkout-guest-form-card';
import { CheckoutStayCard } from '../components/checkout-stay-card';
import { CheckoutSummaryCard } from '../components/checkout-summary-card';
import { getCheckoutQuery } from '../api/bookings-api';
import { useCheckoutPage } from '../hooks/use-checkout-page';

export default function CheckoutPage() {
  const { bookingId } = useParams({ from: '/checkout/$bookingId' });
  const { data } = useSuspenseQuery(getCheckoutQuery(bookingId));
  const { booking, hotel, rooms, prefixes } = data;
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    status,
    roomSubtotal,
    finalPrice,
    taxesAndFees,
    nights,
    selectedArrivalTime,
    submit,
  } = useCheckoutPage(bookingId, booking, rooms, prefixes[0]?.dial_code ?? '+84');

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <CheckoutStayCard booking={booking} hotel={hotel} rooms={rooms} nights={nights} />

      <form className="space-y-6" onSubmit={submit}>
        <CheckoutGuestFormCard register={register} errors={errors} prefixes={prefixes} status={status} />
        <CheckoutSummaryCard
          selectedArrivalTime={selectedArrivalTime}
          roomSubtotal={roomSubtotal}
          finalPrice={finalPrice}
          taxesAndFees={taxesAndFees}
          isSubmitting={isSubmitting}
        />
      </form>
    </section>
  );
}
