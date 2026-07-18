'use client';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-secondary mb-2">Une erreur est survenue</h2>
      <p className="text-sm text-secondary/70 mb-8 max-w-sm">
        Impossible de charger les données. Vérifiez votre connexion et réessayez.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all active:scale-95"
      >
        <RefreshCw size={16} />
        Réessayer
      </button>
    </div>
  );
}
