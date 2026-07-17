'use client';

import { X, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketRow } from './MarketRow';
import { Badge } from '@/components/ui/Badge';
import type { Coupon } from '@/types';
import { useState } from 'react';

interface CouponDetailProps {
  coupon: Coupon;
  onClose: () => void;
}

export function CouponDetail({ coupon, onClose }: CouponDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = coupon.items
      .map((item) => `${item.home_team} vs ${item.away_team} - ${item.prediction}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-hidden flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-muted/60">
          <div className="flex items-center justify-between mb-3">
            <Badge classe={coupon.class} size="md" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X size={18} className="text-secondary/60" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary/60">Cote totale</span>
            <span className="text-xl font-semibold font-mono tabular-nums text-primary">
              {coupon.total_odds.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {coupon.items.map((item, index) => (
              <MarketRow key={item.id || index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-muted/60 bg-surface/50">
          <button
            onClick={handleCopy}
            className={cn(
              'w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2',
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            )}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copié !' : 'Copier le coupon'}
          </button>
        </div>
      </div>
    </div>
  );
}