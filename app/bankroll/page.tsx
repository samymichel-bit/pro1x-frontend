'use client';
import { useState } from 'react';
import { Calculator, Shield, Target, Zap } from 'lucide-react';
import { cn, formatFCFA } from '@/lib/utils';

export default function BankrollPage() {
  const [capital, setCapital] = useState('100000');
  const [risk, setRisk] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [showResult, setShowResult] = useState(false);

  const riskOptions = [
    { value: 'conservative', label: 'Conservateur', icon: Shield },
    { value: 'moderate', label: 'Modéré', icon: Target },
    { value: 'aggressive', label: 'Agressif', icon: Zap },
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const rec = { safe: { amount: 50000, avg_odds: 1.85 }, opportunite: { amount: 30000, avg_odds: 2.85 }, risk: { amount: 20000, avg_odds: 4.25 }, total_allocated: 100000 };

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
              <input type="number" value={capital} onChange={(e) => setCapital(e.target.value)} className="w-full pl-4 pr-12 py-3 rounded-lg border border-muted bg-surface text-secondary font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
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
                    className={cn('flex flex-col items-center justify-center p-3 rounded-xl border transition-all', risk === opt.value ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-muted bg-white text-secondary/60')}>
                    <Icon size={20} className="mb-1.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all">
            <Calculator size={18} /> Calculer mes mises
          </button>
        </form>

        {showResult && (
          <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-secondary mb-1">Recommandation</h3>
            <p className="text-xs text-secondary/60 mb-5">Méthode Kelly simplifiée • Total alloué : {formatFCFA(rec.total_allocated)}</p>
            <div className="space-y-3">
              {[
                { key: 'safe', label: 'Safe', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { key: 'opportunite', label: 'Opportunité', color: 'text-amber-600', bg: 'bg-amber-50' },
                { key: 'risk', label: 'Risk', color: 'text-red-600', bg: 'bg-red-50' },
              ].map((cat) => {
                const item = rec[cat.key as keyof typeof rec];
                return (
                  <div key={cat.key} className={cn('flex items-center justify-between p-4 rounded-lg', cat.bg)}>
                    <div>
                      <p className={cn('text-sm font-semibold', cat.color)}>{cat.label}</p>
                      <p className="text-xs text-secondary/60">Cote moy: {item.avg_odds.toFixed(2)}</p>
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
