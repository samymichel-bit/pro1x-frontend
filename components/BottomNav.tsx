'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/resultats', label: 'Résultats', icon: BarChart3 },
  { href: '/bankroll', label: 'Bankroll', icon: Wallet },
  { href: '/compte', label: 'Compte', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-t border-muted/60 shadow-nav">
      <div className="max-w-md mx-auto flex items-center justify-around h-[68px] px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-200 ease-out',
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary rounded-b-full transition-all duration-200" />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
                className="transition-all duration-200"
              />
              <span className={cn(
                'text-[10px] font-medium tracking-wide transition-all duration-200',
                isActive ? 'font-semibold' : 'font-normal'
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
