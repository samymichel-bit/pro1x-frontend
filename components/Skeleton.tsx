import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div className={cn(
      'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      variant === 'text' && 'h-4 rounded w-full',
      variant === 'card' && 'h-32 rounded-xl w-full',
      variant === 'circle' && 'h-12 w-12 rounded-full',
      className
    )} />
  );
}
