"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, User, Wallet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/resultats", label: "Résultats", icon: BarChart3 },
  { href: "/bankroll", label: "Bankroll", icon: Wallet },
  { href: "/compte", label: "Compte", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-muted/60 bg-white/95 shadow-nav backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="relative flex flex-col items-center gap-1 px-2 py-3 outline-none"
              >
                <span
                  className={cn(
                    "absolute top-0 h-0.5 w-8 rounded-full bg-primary transition-opacity duration-200 ease-out",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
                <Icon
                  size={20}
                  strokeWidth={1.75}
                  className={cn(
                    "transition-colors duration-200 ease-out",
                    active ? "text-primary" : "text-secondary-400"
                  )}
                />
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-wide transition-colors duration-200 ease-out",
                    active ? "text-primary" : "text-secondary-400"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
