#!/bin/bash
echo "🏗️  Alignement final sur l'architecture plate du rapport technique..."

mkdir -p hooks

# 1. HOOKS (Nécessaires pour React Query, structure plate)
cat << 'EOF' > hooks/useResults.ts
import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '@/lib/api';

export function useResults(date: string) {
  return useQuery({
    queryKey: ['results', date],
    queryFn: () => fetchResults(date),
    enabled: !!date,
  });
}
EOF

cat << 'EOF' > hooks/useBankroll.ts
import { useMutation } from '@tanstack/react-query';
import { recommendBankroll } from '@/lib/api';
import type { BankrollRequest, BankrollRecommendation } from '@/types';

export function useBankroll() {
  return useMutation<BankrollRecommendation, Error, BankrollRequest>({
    mutationFn: (payload) => recommendBankroll(payload),
  });
}
EOF

# 2. COMPOSANTS PLATS (Conforme au rapport technique)
cat << 'EOF' > components/ResultCard.tsx
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
EOF

cat << 'EOF' > components/CouponDetail.tsx
'use client';

import { X, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/Badge';
import { useState } from 'react';

export function CouponDetail({ coupon, onClose }: { coupon: any; onClose: () => void }) {
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
            <Badge classe={coupon.class} size="md" />
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
EOF

# 3. CORRECTION DES PAGES (Imports plats)
cat << 'EOF' > app/resultats/page.tsx
'use client';

import { useState } from 'react';
import { ResultCard } from '@/components/ResultCard';
import { Skeleton } from '@/components/Skeleton';
import { useResults } from '@/hooks/useResults';
import { Calendar } from 'lucide-react';

export default function ResultsPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { data, isLoading, error } = useResults(date);
  const results = data?.coupons || data || []; 

  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Résultats</h1>
        <p className="text-sm text-secondary/70">Historique vérifié et transparent de nos performances.</p>
      </header>
      <div className="px-6 mb-6">
        <div className="relative">
          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-muted bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
      <div className="px-6 space-y-4">
        {isLoading ? (
          <><Skeleton variant="card" className="h-32" /><Skeleton variant="card" className="h-32" /></>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Erreur de chargement des résultats.</div>
        ) : results.length > 0 ? (
          results.map((coupon: any, idx: number) => (
            <ResultCard key={coupon.id || idx} coupon={coupon} isPremium={true} />
          ))
        ) : (
          <div className="text-center py-12 text-secondary/60">Aucun résultat pour cette date.</div>
        )}
      </div>
    </div>
  );
}
EOF

cat << 'EOF' > app/bankroll/page.tsx
'use client';

import { useState } from 'react';
import { useBankroll } from '@/hooks/useBankroll';
import { Calculator, Turtle, Rabbit, Cheetah } from 'lucide-react';
import { cn, formatFCFA } from '@/lib/utils';

export default function BankrollPage() {
  const [recommendation, setRecommendation] = useState<any>(null);
  const { mutate, isPending } = useBankroll();
  const [capital, setCapital] = useState('');
  const [risk, setRisk] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (capital) {
      mutate({ capital: Number(capital), risk_tolerance: risk }, { onSuccess: (data) => setRecommendation(data) });
    }
  };

  const riskOptions = [
    { value: 'conservative', label: 'Conservateur', icon: Turtle },
    { value: 'moderate', label: 'Modéré', icon: Rabbit },
    { value: 'aggressive', label: 'Agressif', icon: Cheetah },
  ];

  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Bankroll</h1>
        <p className="text-sm text-secondary/70">Gérez votre capital avec une méthode professionnelle.</p>
      </header>
      <div className="px-6 space-y-6">
        <form onSubmit={handleCalculate} className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">Capital disponible (FCFA)</label>
            <div className="relative">
              <input type="number" value={capital} onChange={(e) => setCapital(e.target.value)} placeholder="100000"
                className="w-full pl-4 pr-12 py-3 rounded-lg border border-muted bg-surface text-secondary font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-secondary/50 font-medium">FCFA</span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-3">Tolérance au risque</label>
            <div className="grid grid-cols-3 gap-3">
              {riskOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button key={opt.value} type="button" onClick={() => setRisk(opt.value as any)}
                    className={cn('flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200',
                      risk === opt.value ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-muted bg-white text-secondary/60 hover:border-primary/30')}>
                    <Icon size={20} className="mb-1.5" strokeWidth={risk === opt.value ? 2.5 : 1.8} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button type="submit" disabled={isPending || !capital}
            className="w-full py-3.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <Calculator size={18} /> {isPending ? 'Calcul...' : 'Calculer mes mises'}
          </button>
        </form>

        {recommendation && (
          <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-secondary mb-1">Recommandation</h3>
            <p className="text-xs text-secondary/60 mb-5">Méthode Kelly simplifiée • Total alloué : {formatFCFA(recommendation.total_allocated)}</p>
            <div className="space-y-3">
              {[
                { key: 'safe', label: 'Safe', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { key: 'opportunite', label: 'Opportunité', color: 'text-amber-600', bg: 'bg-amber-50' },
                { key: 'risk', label: 'Risk', color: 'text-red-600', bg: 'bg-red-50' },
              ].map((cat) => {
                const item = recommendation[cat.key];
                if (!item) return null;
                return (
                  <div key={cat.key} className={cn('flex items-center justify-between p-4 rounded-lg', cat.bg)}>
                    <div>
                      <p className={cn('text-sm font-semibold', cat.color)}>{cat.label}</p>
                      <p className="text-xs text-secondary/60">Cote moy: {item.avg_odds?.toFixed(2)}</p>
                    </div>
                    <p className="text-lg font-bold font-mono tabular-nums text-secondary">{formatFCFA(item.amount)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
EOF

cat << 'EOF' > app/compte/page.tsx
'use client';

import { Crown, CheckCircle2, Mail, Phone, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ComptePage() {
  const [copied, setCopied] = useState(false);
  const user = { first_name: 'Hacksam', last_name: 'Dev', email: 'hacksam@pro1x.com', phone: '+221 77 000 00 00', is_premium: true, premium_expires_at: '2024-12-31' };
  const getInitials = (f: string, l: string) => `${f[0]}${l[0]}`.toUpperCase();
  
  const handleCopy = (text: string) => { 
    navigator.clipboard.writeText(text); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Mon Compte</h1>
      </header>
      <div className="px-6 space-y-6">
        <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{getInitials(user.first_name, user.last_name)}</div>
            <div>
              <h2 className="font-semibold text-secondary text-lg">{user.first_name} {user.last_name}</h2>
              <p className="text-sm text-secondary/60">Membre PRO1X</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-secondary/70"><Mail size={16} className="text-primary/60" /><span>{user.email}</span></div>
            <div className="flex items-center gap-3 text-sm text-secondary/70"><Phone size={16} className="text-primary/60" /><span>{user.phone}</span></div>
          </div>
        </div>

        <div className={cn('rounded-xl border p-6 shadow-soft transition-all', user.is_premium ? 'bg-gradient-to-br from-primary/5 to-transparent border-primary/20' : 'bg-white border-muted/60')}>
          <div className="flex items-start gap-4">
            <div className={cn('p-3 rounded-xl', user.is_premium ? 'bg-primary text-white' : 'bg-muted text-secondary/60')}><Crown size={20} /></div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary mb-1">{user.is_premium ? 'Abonnement Premium' : 'Abonnement Inactif'}</h3>
              {user.is_premium ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <CheckCircle2 size={14} /> <span>Actif jusqu'au {user.premium_expires_at ? new Date(user.premium_expires_at).toLocaleDateString('fr-FR') : '...'}</span>
                </div>
              ) : (
                <button className="mt-2 w-full py-2.5 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-colors">S'abonner pour 2 000 FCFA/mois</button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 text-accent"><LinkIcon size={18} /></div>
            <h3 className="font-semibold text-secondary">Programme d'affiliation</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-secondary/60 mb-1.5 block">Votre code promo</label>
              <div className="flex gap-2">
                <input readOnly value="PRO1X-HACKSAM" className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-muted font-mono text-sm text-secondary focus:outline-none" />
                <button onClick={() => handleCopy('PRO1X-HACKSAM')} className="px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

echo "✅ Architecture plate restaurée et imports corrigés."
echo "🚀 Lance 'npm run dev' pour vérifier que tout compile."