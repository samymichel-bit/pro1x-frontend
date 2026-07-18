'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/Badge';
import { Lock } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import type { Coupon } from '@/types';

interface CouponCardProps {
  coupon: Coupon;
  isPremium: boolean;
  onDetailsClick?: (coupon: Coupon) => void;
}

export function CouponCard({ coupon, isPremium, onDetailsClick }: CouponCardProps) {
  const oddsRange = `${coupon.odds_min?.toFixed(2) ?? '0.00'} – ${coupon.odds_max?.toFixed(2) ?? '0.00'}`;


  return (
    <div className={cn(
      'relative bg-white rounded-xl border border-muted/60 p-5 transition-all duration-300 ease-out shadow-soft hover:shadow-card-hover hover:-translate-y-0.5',
      !isPremium && 'opacity-60 grayscale-[30%]'
    )}>
      <div className="flex items-start justify-between mb-4">
        <Badge classe={coupon.classe} size="md" />

        <div className="flex items-center gap-1.5 text-secondary/70">
          <CalendarDays size={14} />
          <span className="text-xs font-medium font-mono tabular-nums">{coupon.match_count} matchs</span>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-2xl font-semibold font-mono tabular-nums text-secondary">{oddsRange}</span>
      </div>
      {isPremium ? (
        <button
          onClick={() => onDetailsClick?.(coupon)}
          className="w-full py-2.5 rounded-lg border border-primary/30 text-primary font-medium text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/50 active:scale-[0.98]"
        >
          Voir détails
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-2.5 text-primary/60">
          <Lock size={16} />
          <span className="text-sm font-medium">Contenu premium</span>
        </div>
      )}
    </div>
  );
}
