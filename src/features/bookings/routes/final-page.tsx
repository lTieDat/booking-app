import { Link, useParams } from '@tanstack/react-router';
import { Button } from '../../../shared/ui/button';
import { Card } from '../../../shared/ui/card';

export default function FinalPage() {
  const { bookingId } = useParams({ from: '/booking/$bookingId/final' });

  return (
    <section className="mx-auto flex max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="glass-panel w-full rounded-[36px] p-8 text-center md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">Booking complete</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-900">Reservation confirmed</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          Your booking reference is <span className="font-semibold text-slate-900">{bookingId}</span>. The new flow now
          lands on a dedicated completion page instead of relying on loosely coupled redirects.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/bookings-trips">
            <Button>View bookings</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">Back to home</Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
