"use client";

import { useEffect } from "react";
import { Copy, X } from "lucide-react";
import LockIcon from "./LockIcon";
import type { Coupon, SportType } from "@/types";

const SPORT_EMOJI: Record<SportType, string> = {
  football: "⚽",
  basketball: "🏀",
  tennis: "🎾",
};

export default function CouponDetail({
  coupon,
  open,
  onClose,
}: {
  coupon: Coupon | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !coupon) return null;

  function handleCopy() {
    if (!coupon) return;
    const lines = coupon.items.map(
      (item) => `${item.home_team} - ${item.away_team} : ${item.market} (${item.odds.toFixed(2)})`
    );
    const text = `PRO1X\n${lines.join("\n")}\nCote totale : ${coupon.total_odds.toFixed(2)}`;
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 animate-fade-in bg-secondary-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md animate-slide-up rounded-t-2xl bg-white shadow-modal sm:animate-fade-in sm:rounded-2xl">
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-muted sm:hidden" />

        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="font-serif text-lg font-semibold text-secondary-800">Détail du coupon</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary-400 transition-colors duration-200 hover:text-secondary-600"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {coupon.is_locked ? (
          <div className="flex flex-col items-center gap-3 px-8 pb-10 pt-4 text-center">
            <LockIcon size={32} className="text-secondary-300" />
            <p className="text-sm text-secondary-500">
              Abonnez-vous pour accéder au détail de ce coupon et à l&apos;ensemble des pronostics
              premium.
            </p>
          </div>
        ) : (
          <>
            <div className="max-h-[55vh] space-y-1 overflow-y-auto px-5 pb-2">
              {coupon.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-muted/60 py-3 last:border-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{SPORT_EMOJI[item.sport] ?? "🏆"}</span>
                    <div>
                      <p className="text-sm font-medium text-secondary-800">
                        {item.home_team} – {item.away_team}
                      </p>
                      <p className="text-xs text-secondary-400">
                        {item.market} · {item.prediction}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold tabular-nums text-secondary-800">
                      {item.odds.toFixed(2)}
                    </p>
                    <p className="font-mono text-[10px] tabular-nums text-secondary-400">
                      {Math.round(item.probability * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-muted px-5 py-4">
              <div>
                <p className="text-xs text-secondary-400">Cote totale</p>
                <p className="font-mono text-lg font-semibold tabular-nums text-primary">
                  {coupon.total_odds.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg bg-secondary-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-secondary-900"
              >
                <Copy size={14} />
                Copier le coupon
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
