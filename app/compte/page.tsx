'use client';

import { Crown, CheckCircle2, Mail, Phone, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ComptePage() {
  const [copied, setCopied] = useState(false);
  const user = { first_name: 'Hacksam', last_name: 'Dev', email: 'hacksam@pro1x.com', phone: '+221 77 000 00 00', is_premium: true, premium_expires_at: '2024-12-31' };
  const getInitials = (f: string, l: string) => `${f[0]}${l[0]}`.toUpperCase();
  
  const handleCopy = (text: string) => { 
    navigator.clipboard.writeText(text); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="min-h-[100dvh] bg-surface pb-24">
      <header className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Mon Compte</h1>
      </header>
      <div className="px-6 space-y-6">
        <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{getInitials(user.first_name, user.last_name)}</div>
            <div>
              <h2 className="font-semibold text-secondary text-lg">{user.first_name} {user.last_name}</h2>
              <p className="text-sm text-secondary/60">Membre PRO1X</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-secondary/70"><Mail size={16} className="text-primary/60" /><span>{user.email}</span></div>
            <div className="flex items-center gap-3 text-sm text-secondary/70"><Phone size={16} className="text-primary/60" /><span>{user.phone}</span></div>
          </div>
        </div>

        <div className={cn('rounded-xl border p-6 shadow-soft transition-all', user.is_premium ? 'bg-gradient-to-br from-primary/5 to-transparent border-primary/20' : 'bg-white border-muted/60')}>
          <div className="flex items-start gap-4">
            <div className={cn('p-3 rounded-xl', user.is_premium ? 'bg-primary text-white' : 'bg-muted text-secondary/60')}><Crown size={20} /></div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary mb-1">{user.is_premium ? 'Abonnement Premium' : 'Abonnement Inactif'}</h3>
              {user.is_premium ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <CheckCircle2 size={14} /> <span>Actif jusqu'au {user.premium_expires_at ? new Date(user.premium_expires_at).toLocaleDateString('fr-FR') : '...'}</span>
                </div>
              ) : (
                <button className="mt-2 w-full py-2.5 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-colors">S'abonner pour 2 000 FCFA/mois</button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-muted/60 p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 text-accent"><LinkIcon size={18} /></div>
            <h3 className="font-semibold text-secondary">Programme d'affiliation</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-secondary/60 mb-1.5 block">Votre code promo</label>
              <div className="flex gap-2">
                <input readOnly value="PRO1X-HACKSAM" className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-muted font-mono text-sm text-secondary focus:outline-none" />
                <button onClick={() => handleCopy('PRO1X-HACKSAM')} className="px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
