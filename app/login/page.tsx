'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('hacksam@pro1x.com');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation d'un délai réseau
    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setError('Email ou mot de passe incorrect');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-surface relative overflow-hidden">
      {/* Formes abstraites en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-card p-8 border border-muted/40">
          <div className="text-center mb-8">
            <h1 className="font-serif text-5xl font-bold text-primary tracking-tight">PRO1X</h1>
            <p className="text-sm text-secondary/60 mt-2">Espace membre premium</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-muted bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-muted bg-white pr-11 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-muted/50 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-secondary/60" />
                  ) : (
                    <Eye size={18} className="text-secondary/60" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={16} className="text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-semibold text-white bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-[10px] text-primary/80 text-center font-mono">
              🧪 MODE DÉMO : Utilisez n'importe quel email/mot de passe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
