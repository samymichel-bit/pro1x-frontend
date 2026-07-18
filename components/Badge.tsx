'use client';

import { cn } from '@/lib/utils';
import type { CouponClass } from '@/types';

interface BadgeProps {
  classe: CouponClass;
  size?: 'sm' | 'md';
  className?: string;
}

const badgeConfig = {
  safe: { bg: 'bg-emerald-500', text: 'text-white', label: 'Safe', glow: 'shadow-emerald-500/20' },
  opportunite: { bg: 'bg-amber-500', text: 'text-white', label: 'Opportunité', glow: 'shadow-amber-500/20' },
  risk: { bg: 'bg-red-500', text: 'text-white', label: 'Risk', glow: 'shadow-red-500/20' },
} as const;

export function Badge({ classe, size = 'sm', className }: BadgeProps) {
  const config = badgeConfig[classe];
  return (
    <span className={cn(
      'inline-flex items-center font-semibold uppercase tracking-wider shadow-sm',
      config.bg, config.text, config.glow,
      size === 'sm' && 'px-2.5 py-0.5 rounded-full text-[10px]',
      size === 'md' && 'px-3 py-1 rounded-md text-xs',
      className
    )}>
      {config.label}
    </span>
  );
}
