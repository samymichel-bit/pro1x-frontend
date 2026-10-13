'use client';
import { ResultCard } from '@/components/ResultCard';

const MOCK_RESULTS = [
  {
    id: 'r1', class: 'safe', total_odds: 1.78, min_odds: 1.50, max_odds: 2.00, match_count: 2, created_at: new Date().toISOString(), sha256_hash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    items: [
      { id: 'r1', sport: 'football', league: 'Ligue 1', home_team: 'PSG', away_team: 'Lyon', market: 'Victoire PSG', prediction: 'Oui', odds: 1.45, probability: 82, match_date: new Date().toISOString(), status: 'won', actual_result: 'PSG 3-1 Lyon' },
      { id: 'r2', sport: 'basketball', league: 'NBA', home_team: 'Bucks', away_team: 'Nets', market: 'Over 220.5', prediction: 'Oui', odds: 1.88, probability: 65, match_date: new Date().toISOString(), status: 'won', actual_result: 'Bucks 118 - Nets 110' }
    ]
  },
  {
    id: 'r2', class: 'opportunite', total_odds: 2.65, min_odds: 2.20, max_odds: 3.20, match_count: 2, created_at: new Date().toISOString(), sha256_hash: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567',
    items: [
      { id: 'r3', sport: 'football', league: 'Premier League', home_team: 'Arsenal', away_team: 'Tottenham', market: 'Arsenal & Over 2.5', prediction: 'Oui', odds: 2.45, probability: 48, match_date: new Date().toISOString(), status: 'won', actual_result: 'Arsenal 3-1 Tottenham' },
      { id: 'r4', sport: 'football', league: 'La Liga', home_team: 'Atletico', away_team: 'Sevilla', market: 'BTTS', prediction: 'Oui', odds: 1.95, probability: 62, match_date: new Date().toISOString(), status: 'lost', actual_result: 'Atletico 2-0 Sevilla' }
    ]
  }
];

export default function ResultsPage() {
  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Résultats</h1>
        <p className="text-sm text-secondary/70">Historique vérifié et transparent de nos performances.</p>
      </header>
      <div className="px-6 space-y-4">
        {MOCK_RESULTS.map((coupon) => <ResultCard key={coupon.id} coupon={coupon} isPremium={true} />)}
      </div>
    </div>
  );
}
