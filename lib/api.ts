import axios from "axios";
import Cookies from "js-cookie";
import type {
  BankrollRecommendation,
  BankrollRequest,
  Coupon,
  CouponClass,
  LoginResponse,
  PaymentInitiation,
  ResultsResponse,
  UserProfile,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const ACCESS_TOKEN_COOKIE = "pro1x_access";
const REFRESH_TOKEN_COOKIE = "pro1x_refresh";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach the JWT (stored client-side in an httpOnly-friendly cookie name)
// to every outgoing request.
api.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN_COOKIE);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Clear local session state on 401 so the UI can fall back to logged-out views.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      Cookies.remove(ACCESS_TOKEN_COOKIE);
      Cookies.remove(REFRESH_TOKEN_COOKIE);
    }
    return Promise.reject(error);
  }
);

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login/", { email, password });
  Cookies.set(ACCESS_TOKEN_COOKIE, data.access, { expires: 1, secure: true, sameSite: "strict" });
  Cookies.set(REFRESH_TOKEN_COOKIE, data.refresh, { expires: 7, secure: true, sameSite: "strict" });
  return data;
}

export function logout() {
  Cookies.remove(ACCESS_TOKEN_COOKIE);
  Cookies.remove(REFRESH_TOKEN_COOKIE);
}

export function isAuthenticated() {
  return Boolean(Cookies.get(ACCESS_TOKEN_COOKIE));
}

export async function fetchDailyCoupons(classe: CouponClass): Promise<Coupon[]> {
  const { data } = await api.get<Coupon[]>("/coupons/today/", { params: { class: classe } });
  return data;
}

export async function fetchResults(date: string): Promise<ResultsResponse> {
  const { data } = await api.get<ResultsResponse>("/results/", { params: { date } });
  return data;
}

export async function recommendBankroll(
  payload: BankrollRequest
): Promise<BankrollRecommendation> {
  const { data } = await api.post<BankrollRecommendation>("/bankroll/recommend/", payload);
  return data;
}

export async function initiatePayment(): Promise<PaymentInitiation> {
  const { data } = await api.post<PaymentInitiation>("/payments/initiate/");
  return data;
}

export async function fetchUserProfile(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/user/profile");
  return data;
}
