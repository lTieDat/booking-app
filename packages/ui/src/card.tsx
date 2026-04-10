import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@booking/shared/lib';

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('surface-card rounded-[28px] p-6', className)} {...props}>
      {children}
    </div>
  );
}
