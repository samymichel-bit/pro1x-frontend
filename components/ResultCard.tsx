"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Copy, ShieldCheck, XCircle } from "lucide-react";
import Badge from "./Badge";
import LockIcon from "./LockIcon";
import type { Coupon, CouponClass } from "@/types";

const CLASS_LABEL: Record<CouponClass, string> = {
  safe: "Safe",
  opportunite: "Opportunités",
  risk: "Risk",
};

export default function ResultCard({ coupon }: { coupon: Coupon }) {
  const [expanded, setExpanded] = useState(false);
  const won = coupon.status === "won";
  const lost = coupon.status === "lost";
  const hasDetails = coupon.items.length > 0;

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white transition-colors duration-200 ${
        won ? "border-emerald-200 bg-emerald-50/40" : lost ? "border-red-200 bg-red-50/40" : "border-muted"
      }`}
    >
      <button
        type="button"
        onClick={() => hasDetails && setExpanded((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2.5">
          <Badge classe={coupon.classe}>{CLASS_LABEL[coupon.classe]}</Badge>
          {won && <CheckCircle2 size={18} className="text-emerald-600" />}
          {lost && <XCircle size={18} className="text-red-500" />}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tabular-nums text-secondary-500">
            {coupon.total_odds.toFixed(2)}
          </span>
          {hasDetails && (
            <ChevronDown
              size={16}
              className={`text-secondary-400 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      </button>

      {expanded && hasDetails && (
        <div className="space-y-2 border-t border-muted/60 px-4 py-3">
          {coupon.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-secondary-700">
                {item.home_team} – {item.away_team}
                <span className="ml-2 text-xs text-secondary-400">{item.market}</span>
              </span>
              <span
                className={`font-mono text-xs tabular-nums ${
                  item.result === "won"
                    ? "text-emerald-600"
                    : item.result === "lost"
                      ? "text-red-500"
                      : "text-secondary-400"
                }`}
              >
                {item.odds.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {!hasDetails && (
        <div className="flex items-center gap-2 border-t border-muted/60 px-4 py-3 text-xs text-secondary-400">
          <LockIcon size={14} />
          Connectez-vous pour voir le détail
        </div>
      )}

      {coupon.hash && (
        <div className="flex items-center justify-between border-t border-muted/60 px-4 py-2">
          <div
            className="flex items-center gap-1.5 text-[11px] font-medium text-primary"
            title="Coupon verrouillé avant les matchs et vérifiable par empreinte SHA-256"
          >
            <ShieldCheck size={13} />
            Vérifié
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(coupon.hash ?? "")}
            className="flex items-center gap-1 font-mono text-[10px] text-secondary-400 transition-colors duration-200 hover:text-secondary-600"
          >
            {coupon.hash.slice(0, 10)}…
            <Copy size={11} />
          </button>
        </div>
      )}
    </div>
  );
}
