'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/Badge';
import { CheckCircle2, XCircle, Lock, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function ResultCard({ coupon, isPremium }: { coupon: any; isPremium: boolean }) {
  const [copied, setCopied] = useState(false);
  const isWon = coupon.items?.every((item: any) => item.status === 'won');
  const isLost = coupon.items?.some((item: any) => item.status === 'lost');

  const handleCopyHash = () => {
    if (coupon.sha256_hash) {
      navigator.clipboard.writeText(coupon.sha256_hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn(
      'relative bg-white rounded-xl border p-5 transition-all duration-300',
      isWon ? 'border-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.1)]' : 
      isLost ? 'border-red-200 shadow-[0_0_0_1px_rgba(239,68,68,0.1)]' : 
      'border-muted/60 shadow-soft'
    )}>
      <div className="flex items-start justify-between mb-4">
        <Badge classe={coupon.class} size="md" />
        <div className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
          isWon ? 'bg-emerald-50 text-emerald-700' : isLost ? 'bg-red-50 text-red-700' : 'bg-muted/50 text-secondary/60'
        )}>
          {isWon ? <CheckCircle2 size={14} /> : isLost ? <XCircle size={14} /> : <Lock size={14} />}
          {isWon ? 'Gagné' : isLost ? 'Perdu' : 'En cours'}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-secondary/60">Cote totale</span>
        <span className="text-xl font-semibold font-mono tabular-nums text-secondary">{coupon.total_odds?.toFixed(2)}</span>
      </div>
      {isPremium ? (
        <div className="pt-4 border-t border-muted/40">
          <p className="text-[10px] text-secondary/50 font-mono mb-1">SHA-256 Hash (Preuve d'intégrité)</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary/70 font-mono truncate max-w-[200px]">{coupon.sha256_hash || 'Non disponible'}</span>
            <button onClick={handleCopyHash} className="flex items-center gap-1 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors">
              {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 py-3 mt-2 rounded-lg bg-muted/30 text-primary/60">
          <Lock size={14} /> <span className="text-xs font-medium">Connectez-vous pour voir le détail</span>
        </div>
      )}
    </div>
  );
}
