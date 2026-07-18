'use client';

import { X, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/Badge';
import { useState } from 'react';
import type { Coupon } from '@/types';

interface CouponDetailProps {
  coupon: Coupon;
  onClose: () => void;
}

export function CouponDetail({ coupon, onClose }: CouponDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = coupon.items?.map((item: any) => `${item.home_team} vs ${item.away_team} - ${item.prediction}`).join('\n') || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 bg-muted rounded-full" /></div>
        <div className="px-6 py-4 border-b border-muted/60">
          <div className="flex items-center justify-between mb-3">
            <Badge classe={coupon.classe} size="md" />

            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted/50 transition-colors"><X size={18} className="text-secondary/60" /></button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary/60">Cote totale</span>
            <span className="text-xl font-semibold font-mono tabular-nums text-primary">{coupon.total_odds?.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {coupon.items?.map((item: any, index: number) => (
              <div key={item.id || index} className="p-4 rounded-xl border border-muted/60 bg-white hover:shadow-soft transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10"><span className="text-primary text-xs font-bold">{item.sport === 'football' ? '⚽' : item.sport === 'basketball' ? '🏀' : '🎾'}</span></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary truncate">{item.home_team} <span className="text-muted">vs</span> {item.away_team}</p>
                    <p className="text-xs text-secondary/60 truncate">{item.league}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-muted/40">
                  <div>
                    <p className="text-xs text-secondary/60 mb-0.5">{item.market}</p>
                    <p className="text-sm font-semibold text-primary">{item.prediction}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary/60 mb-0.5">Cote</p>
                    <p className="text-lg font-semibold font-mono tabular-nums text-secondary">{item.odds?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-muted/60 bg-surface/50">
          <button onClick={handleCopy} className={cn('w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2', copied ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90')}>
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copié !' : 'Copier le coupon'}
          </button>
        </div>
      </div>
    </div>
  );
}
