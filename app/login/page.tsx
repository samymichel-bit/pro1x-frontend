"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(identifier, password);
      router.push("/");
    } catch {
      setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-surface px-6">
      {/* Illustration abstraite très légère, en fond */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-72 w-72 rotate-12 rounded-[3rem] bg-primary/5" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-primary/5" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rotate-45 bg-accent/5" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-in-up rounded-2xl border border-muted/70 bg-white p-8 shadow-modal">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-800 font-serif text-lg font-semibold text-white">
            P1X
          </div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-secondary-800">
            PRO1X
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary-400">
            Pronostics Premium
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="identifier" className="mb-1.5 block text-sm font-medium text-secondary-700">
              Email ou téléphone
            </label>
            <input
              id="identifier"
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="w-full rounded-lg border border-muted bg-white px-4 py-2.5 text-sm text-secondary-800 outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-secondary-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-muted bg-white px-4 py-2.5 text-sm text-secondary-800 outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-800 disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary-500">
          Pas encore de compte ?{" "}
          <Link href="/compte" className="font-medium text-primary hover:text-primary-800">
            S&apos;abonner
          </Link>
        </p>
      </div>
    </div>
  );
}
