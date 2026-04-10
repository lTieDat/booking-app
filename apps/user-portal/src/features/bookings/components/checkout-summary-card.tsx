import { Button } from '@booking/ui';
import { Card } from '@booking/ui';
import { formatCurrency } from '@booking/shared';

interface CheckoutSummaryCardProps {
  selectedArrivalTime?: string;
  roomSubtotal: number;
  finalPrice: number;
  taxesAndFees: number;
  isSubmitting: boolean;
}

export function CheckoutSummaryCard({
  selectedArrivalTime,
  roomSubtotal,
  finalPrice,
  taxesAndFees,
  isSubmitting,
}: CheckoutSummaryCardProps) {
  return (
    <Card className="rounded-[32px] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Summary</p>
          <h2 className="text-2xl font-semibold text-slate-900">What you are about to confirm</h2>
        </div>
        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-right">
          <p className="text-sm text-slate-500">Arrival</p>
          <p className="font-semibold text-slate-900">{selectedArrivalTime}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Room subtotal</span>
          <span className="font-medium text-slate-900">{formatCurrency(roomSubtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes and fees</span>
          <span className="font-medium text-slate-900">{formatCurrency(taxesAndFees)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
          <span className="font-semibold text-slate-900">Final total</span>
          <span className="font-semibold text-slate-900">{formatCurrency(finalPrice)}</span>
        </div>
      </div>

      <Button className="mt-6" type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Finishing booking...' : 'Complete booking'}
      </Button>
    </Card>
  );
}
