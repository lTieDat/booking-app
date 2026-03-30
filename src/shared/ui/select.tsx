import { forwardRef } from 'react';
import type { PropsWithChildren, SelectHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export const Select = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
