import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@booking/shared/lib';

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  aside?: ReactNode;
}

export function Field({ label, hint, error, className, aside, children }: PropsWithChildren<FieldProps>) {
  return (
    <label className={cn('block space-y-2', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {aside}
      </div>
      {children}
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </label>
  );
}
