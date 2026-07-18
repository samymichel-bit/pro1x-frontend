'use client';
import { useAuth } from '@/lib/useAuth';
import { Lock, LogIn } from 'lucide-react';
import Link from 'next/link';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Lock size={32} className="text-primary" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-secondary mb-2">Accès Restreint</h2>
        <p className="text-sm text-secondary/70 mb-8 max-w-sm">
          Cette fonctionnalité est réservée aux membres PRO1X. Connectez-vous pour gérer votre bankroll et votre abonnement.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all active:scale-95"
        >
          <LogIn size={16} />
          Se connecter
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
