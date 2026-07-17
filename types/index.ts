export type CouponClass = "safe" | "opportunite" | "risk";

export type SportType = "football" | "basketball" | "tennis";

export type ItemResult = "won" | "lost" | "pending";

export interface CouponItem {
  id: string;
  sport: SportType;
  home_team: string;
  away_team: string;
  market: string;
  prediction: string;
  odds: number;
  probability: number;
  match_date: string;
  result?: ItemResult;
}

export interface Coupon {
  id: string;
  classe: CouponClass;
  date: string;
  odds_min: number;
  odds_max: number;
  total_odds: number;
  match_count: number;
  items: CouponItem[];
  is_locked: boolean;
  status?: "won" | "lost" | "pending";
  hash?: string;
  locked_at?: string;
}

export interface ResultsResponse {
  date: string;
  coupons: Coupon[];
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  is_premium: boolean;
  premium_until?: string;
  affiliate_code: string;
}

export type UserProfile = User;

export type RiskTolerance = "conservateur" | "modere" | "agressif";

export interface BankrollRequest {
  capital: number;
  risk_tolerance: RiskTolerance;
}

export interface BankrollClassRecommendation {
  classe: CouponClass;
  amount: number;
  average_odds: number;
}

export interface BankrollRecommendation {
  recommendations: BankrollClassRecommendation[];
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface PaymentInitiation {
  payment_url: string;
}
