import { cn } from '@booking/shared/lib';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton rounded-2xl', className)} />;
}
