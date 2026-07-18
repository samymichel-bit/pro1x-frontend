'use client';
import { Crown, CheckCircle2, Mail, Phone, Link as LinkIcon, Copy, Check, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ComptePage() {
  const [copied, setCopied] = useState(false);
  const { logout } = useAuth();
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-[100dvh] bg-surface pb-24">
        <header className="px-6 pt-8 pb-6 flex justify-between items-start">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary mb-2">Mon Compte</h1>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg bg-white border border-muted text-secondary/60 hover:text-red-600 hover:border-red-200 transition-all"
          >
            <LogOut size={18} />
          </button>
        </header>

        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                HD
              </div>
              <div>
                <h2 className="font-semibold text-secondary text-lg">Hacksam Dev</h2>
                <p className="text-sm text-secondary/60">Membre PRO1X</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-secondary/70">
                <Mail size={16} className="text-primary/60" />
                <span>hacksam@pro1x.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary/70">
                <Phone size={16} className="text-primary/60" />
                <span>+221 77 000 00 00</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6 shadow-soft transition-all bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary text-white">
                <Crown size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary mb-1">Abonnement Premium</h3>
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <CheckCircle2 size={14} /> <span>Actif jusqu'au 31/12/2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <LinkIcon size={18} />
              </div>
              <h3 className="font-semibold text-secondary">Programme d'affiliation</h3>
            </div>

            <div>
              <label className="text-xs text-secondary/60 mb-1.5 block">Votre code promo</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value="PRO1X-HACKSAM"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-muted font-mono text-sm text-secondary focus:outline-none"
                />
                <button
                  onClick={() => handleCopy('PRO1X-HACKSAM')}
                  className="px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
