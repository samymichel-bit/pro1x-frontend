'use client';
import { useState } from 'react';
import { Tabs } from '@/components/Tabs';
import { CouponCard } from '@/components/CouponCard';
import { CouponDetail } from '@/components/CouponDetail';
import type { Coupon, CouponClass } from '@/types';

const MOCK_COUPONS: Record<CouponClass, Coupon[]> = {
  safe: [{
    id: '1', class: 'safe', total_odds: 1.85, min_odds: 1.50, max_odds: 2.10, match_count: 3, created_at: new Date().toISOString(),
    items: [
      { id: '1', sport: 'football', league: 'Ligue 1', home_team: 'PSG', away_team: 'Marseille', market: 'Over 2.5', prediction: 'Oui', odds: 1.65, probability: 78, match_date: new Date().toISOString() },
      { id: '2', sport: 'football', league: 'Premier League', home_team: 'Man City', away_team: 'Arsenal', market: 'BTTS', prediction: 'Oui', odds: 1.72, probability: 72, match_date: new Date().toISOString() },
      { id: '3', sport: 'basketball', league: 'NBA', home_team: 'Lakers', away_team: 'Warriors', market: 'Victoire Lakers', prediction: 'Oui', odds: 1.58, probability: 68, match_date: new Date().toISOString() }
    ]
  }],
  opportunite: [{
    id: '2', class: 'opportunite', total_odds: 2.85, min_odds: 2.20, max_odds: 3.50, match_count: 2, created_at: new Date().toISOString(),
    items: [
      { id: '4', sport: 'football', league: 'Serie A', home_team: 'Juventus', away_team: 'Inter', market: 'Victoire Inter', prediction: 'Oui', odds: 2.35, probability: 52, match_date: new Date().toISOString() },
      { id: '5', sport: 'tennis', league: 'ATP', home_team: 'Djokovic', away_team: 'Alcaraz', market: 'Victoire Djokovic', prediction: 'Oui', odds: 2.10, probability: 55, match_date: new Date().toISOString() }
    ]
  }],
  risk: [{
    id: '3', class: 'risk', total_odds: 4.25, min_odds: 3.50, max_odds: 5.00, match_count: 3, created_at: new Date().toISOString(),
    items: [
      { id: '6', sport: 'football', league: 'Ligue 1', home_team: 'Lyon', away_team: 'Monaco', market: 'Victoire Lyon', prediction: 'Oui', odds: 3.80, probability: 28, match_date: new Date().toISOString() },
      { id: '7', sport: 'basketball', league: 'NBA', home_team: 'Celtics', away_team: 'Heat', market: 'Celtics +8.5', prediction: 'Oui', odds: 1.92, probability: 45, match_date: new Date().toISOString() },
      { id: '8', sport: 'football', league: 'Premier League', home_team: 'Liverpool', away_team: 'Chelsea', market: 'Liverpool MT1', prediction: 'Oui', odds: 2.45, probability: 38, match_date: new Date().toISOString() }
    ]
  }]
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<CouponClass>('safe');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const coupons = MOCK_COUPONS[activeTab] || [];

  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">PRO1X</h1>
        <p className="text-sm text-secondary/70 leading-relaxed">Une équipe de parieurs professionnels, armée d'outils IA, analyse et publie chaque jour des pronostics premium.</p>
      </header>
      <div className="px-6 mb-6"><Tabs activeTab={activeTab} onTabChange={setActiveTab} /></div>
      <div className="px-6 space-y-4">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} isPremium={true} onDetailsClick={setSelectedCoupon} />
        ))}
      </div>
      {selectedCoupon && <CouponDetail coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />}
    </div>
  );
}
