"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDailyCoupons } from "@/lib/api";
import CouponCard from "@/components/CouponCard";
import CouponDetail from "@/components/CouponDetail";
import CouponSkeleton from "@/components/CouponSkeleton";
import type { Coupon, CouponClass } from "@/types";

const TABS: { key: CouponClass; label: string }[] = [
  { key: "safe", label: "Safe" },
  { key: "opportunite", label: "Opportunités" },
  { key: "risk", label: "Risk" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<CouponClass>("safe");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const { data: coupons, isLoading } = useQuery({
    queryKey: ["coupons", activeTab],
    queryFn: () => fetchDailyCoupons(activeTab),
  });

  return (
    <div className="mx-auto max-w-md px-4 pt-8">
      <header className="mb-6 text-center">
        <p className="font-serif text-[22px] leading-snug text-secondary-800">
          <span className="font-semibold">PRO1X</span> — Une équipe de parieurs professionnels,
          armée d&apos;outils IA, analyse et publie chaque jour des pronostics premium.
        </p>
      </header>

      <div className="mb-6 flex rounded-xl bg-muted/50 p-1" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all duration-200 ease-out ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-sm"
                : "text-secondary-500 hover:text-secondary-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading && Array.from({ length: 3 }).map((_, index) => <CouponSkeleton key={index} />)}

        {!isLoading && coupons?.length === 0 && (
          <p className="py-10 text-center text-sm text-secondary-400">
            Aucun coupon disponible pour le moment.
          </p>
        )}

        {!isLoading &&
          coupons?.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onViewDetails={() => setSelectedCoupon(coupon)}
            />
          ))}
      </div>

      <CouponDetail
        coupon={selectedCoupon}
        open={Boolean(selectedCoupon)}
        onClose={() => setSelectedCoupon(null)}
      />
    </div>
  );
}
