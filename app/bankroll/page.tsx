"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Rabbit, Turtle, Zap, type LucideIcon } from "lucide-react";
import { recommendBankroll } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { CouponClass, RiskTolerance } from "@/types";

interface RiskOption {
  key: RiskTolerance;
  label: string;
  hint: string;
  icon: LucideIcon;
}

const RISK_OPTIONS: RiskOption[] = [
  { key: "conservateur", label: "Conservateur", hint: "Priorité sécurité", icon: Turtle },
  { key: "modere", label: "Modéré", hint: "Risque équilibré", icon: Rabbit },
  { key: "agressif", label: "Agressif", hint: "Gros potentiel", icon: Zap },
];

const CLASS_LABEL: Record<CouponClass, string> = {
  safe: "Safe",
  opportunite: "Opportunités",
  risk: "Risk",
};

export default function BankrollPage() {
  const [capital, setCapital] = useState("");
  const [risk, setRisk] = useState<RiskTolerance>("modere");

  const mutation = useMutation({
    mutationFn: () => recommendBankroll({ capital: Number(capital), risk_tolerance: risk }),
  });

  return (
    <div className="mx-auto max-w-md px-4 pt-8">
      <h1 className="mb-6 font-serif text-xl font-semibold text-secondary-800">Bankroll</h1>

      <div className="rounded-2xl border border-muted bg-white p-6 shadow-card">
        <label htmlFor="capital" className="mb-1.5 block text-sm font-medium text-secondary-700">
          Capital
        </label>
        <div className="mb-5 flex items-center rounded-lg border border-muted transition-colors duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <span className="pl-4 text-sm font-medium text-secondary-400">FCFA</span>
          <input
            id="capital"
            type="number"
            inputMode="numeric"
            min={0}
            value={capital}
            onChange={(event) => setCapital(event.target.value)}
            placeholder="50 000"
            className="w-full rounded-lg bg-transparent px-3 py-2.5 text-right font-mono text-sm tabular-nums text-secondary-800 outline-none"
          />
        </div>

        <p className="mb-2 block text-sm font-medium text-secondary-700">Tolérance au risque</p>
        <div className="mb-6 grid grid-cols-3 gap-2">
          {RISK_OPTIONS.map(({ key, label, hint, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setRisk(key)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-200",
                risk === key ? "border-primary bg-primary/5" : "border-muted hover:border-secondary-300"
              )}
            >
              <Icon
                size={22}
                strokeWidth={1.6}
                className={risk === key ? "text-primary" : "text-secondary-400"}
              />
              <span className="text-xs font-semibold text-secondary-700">{label}</span>
              <span className="text-[10px] leading-tight text-secondary-400">{hint}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => mutation.mutate()}
          disabled={!capital || mutation.isPending}
          className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-800 disabled:opacity-60"
        >
          {mutation.isPending ? "Calcul en cours..." : "Calculer mes mises"}
        </button>
      </div>

      {mutation.data && (
        <div className="mt-6 grid grid-cols-1 gap-3">
          {mutation.data.recommendations.map((rec) => (
            <div
              key={rec.classe}
              className="flex items-center justify-between rounded-xl border border-muted bg-white px-4 py-3"
            >
              <span className="text-sm font-medium text-secondary-700">{CLASS_LABEL[rec.classe]}</span>
              <div className="text-right">
                <p className="font-mono text-sm font-semibold tabular-nums text-secondary-800">
                  {rec.amount.toLocaleString("fr-FR")} FCFA
                </p>
                <p className="font-mono text-[11px] tabular-nums text-secondary-400">
                  cote moy. {rec.average_odds.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs leading-relaxed text-secondary-400">
        Les recommandations reposent sur une méthode de gestion de bankroll inspirée du critère de
        Kelly simplifié. Elles restent indicatives et ne garantissent aucun gain.
      </p>
    </div>
  );
}
