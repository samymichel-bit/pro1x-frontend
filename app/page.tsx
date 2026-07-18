'use client';

import { useState } from 'react';
import { Tabs } from '@/components/Tabs';
import { CouponCard } from '@/components/CouponCard';
import { CouponDetail } from '@/components/CouponDetail';
import { Skeleton } from '@/components/Skeleton';
import { useCoupons } from '@/hooks/useCoupons';
import type { Coupon, CouponClass } from '@/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<CouponClass>('safe');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const { data: coupons, isLoading, error } = useCoupons(activeTab);

  // Mock isPremium pour le test visuel (à remplacer par le vrai état utilisateur)
  const isPremium = true; 

  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">PRO1X</h1>
        <p className="text-sm text-secondary/70 leading-relaxed">
          Une équipe de parieurs professionnels, armée d'outils IA, analyse et publie chaque jour des pronostics premium.
        </p>
      </header>

      <div className="px-6 mb-6">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="px-6 space-y-4">
        {isLoading ? (
          <>
            <Skeleton variant="card" className="h-40" />
            <Skeleton variant="card" className="h-40" />
          </>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Erreur de chargement des coupons.</div>
        ) : coupons && coupons.length > 0 ? (
          coupons.map((coupon: Coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              isPremium={isPremium}
              onDetailsClick={setSelectedCoupon}
            />
          ))
        ) : (
          <div className="text-center py-12 text-secondary/60">Aucun coupon disponible pour cette catégorie.</div>
        )}
      </div>

      {selectedCoupon && (
        <CouponDetail
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
        />
      )}
    </div>
  );
}
