"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircle2, CreditCard, Copy, Gift, Pencil, User as UserIcon } from "lucide-react";
import { fetchUserProfile, initiatePayment } from "@/lib/api";
import { formatDateFr } from "@/lib/utils";

export default function ComptePage() {
  const { data: user } = useQuery({ queryKey: ["profile"], queryFn: fetchUserProfile });

  const paymentMutation = useMutation({
    mutationFn: initiatePayment,
    onSuccess: (data) => {
      window.location.href = data.payment_url;
    },
  });

  const referralLink = user ? `https://pro1x.app/r/${user.affiliate_code}` : "";

  return (
    <div className="mx-auto max-w-md space-y-4 px-4 pt-8">
      <h1 className="mb-2 font-serif text-xl font-semibold text-secondary-800">Compte</h1>

      {/* Profil */}
      <section className="rounded-2xl border border-muted bg-surface p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-secondary-700">
          <UserIcon size={16} className="text-primary" />
          Profil
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-xl font-semibold text-white">
            {user?.full_name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-secondary-800">{user?.full_name}</p>
            <p className="truncate text-xs text-secondary-500">{user?.email}</p>
            {user?.phone && <p className="truncate text-xs text-secondary-500">{user.phone}</p>}
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-lg border border-muted px-3 py-1.5 text-xs font-medium text-secondary-500"
          >
            <Pencil size={12} />
            Modifier
          </button>
        </div>
      </section>

      {/* Abonnement */}
      <section className="rounded-2xl border border-muted bg-surface p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-secondary-700">
          <CreditCard size={16} className="text-primary" />
          Abonnement
        </div>
        {user?.is_premium ? (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 size={18} />
            Premium actif {user.premium_until && `jusqu'au ${formatDateFr(user.premium_until)}`}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => paymentMutation.mutate()}
            disabled={paymentMutation.isPending}
            className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-600 disabled:opacity-60"
          >
            {paymentMutation.isPending ? "Redirection..." : "S'abonner pour 2 000 FCFA/mois"}
          </button>
        )}
      </section>

      {/* Affiliation */}
      <section className="rounded-2xl border border-muted bg-surface p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-secondary-700">
          <Gift size={16} className="text-primary" />
          Affiliation
        </div>
        <div className="mb-3 flex items-center justify-between rounded-lg border border-dashed border-muted px-4 py-2.5">
          <span className="font-mono text-sm font-semibold tracking-wide text-secondary-800">
            {user?.affiliate_code ?? "PRO1X"}
          </span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(user?.affiliate_code ?? "PRO1X")}
            className="text-secondary-400 transition-colors duration-200 hover:text-primary"
            aria-label="Copier le code promo"
          >
            <Copy size={14} />
          </button>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5">
          <span className="truncate text-xs text-secondary-500">{referralLink}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="ml-2 shrink-0 text-secondary-400 transition-colors duration-200 hover:text-primary"
            aria-label="Copier le lien de parrainage"
          >
            <Copy size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
