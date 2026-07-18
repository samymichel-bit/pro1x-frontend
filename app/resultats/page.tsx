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
