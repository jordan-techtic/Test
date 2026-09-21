import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[8px] bg-white/10', className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export { Skeleton };
