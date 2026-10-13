import { http, HttpResponse } from 'msw';
import { mockUser, mockCoupons, mockResults, mockBankrollRecommendation } from './data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const handlers = [
  // Auth Login
  http.post(`${API_BASE}/auth/login/`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    
    // Simulation basique : accepter tout sauf mot de passe vide
    if (!body.password) {
      return HttpResponse.json({ detail: 'Mot de passe requis' }, { status: 400 });
    }

    return HttpResponse.json({
      access: 'mock-jwt-access-token-12345',
      refresh: 'mock-jwt-refresh-token-67890',
    });
  }),

  // Auth Logout
  http.post(`${API_BASE}/auth/logout/`, () => {
    return HttpResponse.json({ detail: 'Déconnexion réussie' });
  }),

  // Coupons du jour
  http.get(`${API_BASE}/coupons/today/`, ({ request }) => {
    const url = new URL(request.url);
    const classe = url.searchParams.get('class') || 'safe';
    
    const coupons = mockCoupons[classe] || [];
    return HttpResponse.json(coupons);
  }),

  // Résultats par date
  http.get(`${API_BASE}/results/`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    
    // Retourner les résultats mockés (en production, filtrer par date)
    return HttpResponse.json({ coupons: mockResults });
  }),

  // Bankroll recommendation
  http.post(`${API_BASE}/bankroll/recommend/`, async ({ request }) => {
    const body = await request.json() as { capital: number; risk_tolerance: string };
    
    // Calculer dynamiquement basé sur le capital
    const capital = body.capital || 100000;
    const recommendation = {
      safe: { amount: Math.round(capital * 0.5), avg_odds: 1.85 },
      opportunite: { amount: Math.round(capital * 0.3), avg_odds: 2.85 },
      risk: { amount: Math.round(capital * 0.2), avg_odds: 4.25 },
      total_allocated: capital,
      method: 'Kelly simplifié',
    };
    
    return HttpResponse.json(recommendation);
  }),

  // Payment initiation (CinetPay)
  http.post(`${API_BASE}/payments/initiate/`, () => {
    return HttpResponse.json({
      payment_url: 'https://sandbox.cinetpay.com/seam/payment/12345',
      transaction_id: 'mock-txn-001',
    });
  }),

  // User profile
  http.get(`${API_BASE}/user/profile`, () => {
    return HttpResponse.json(mockUser);
  }),
];
