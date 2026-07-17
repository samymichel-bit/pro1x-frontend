"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchResults } from "@/lib/api";
import { todayISO } from "@/lib/utils";
import ResultCard from "@/components/ResultCard";
import CouponSkeleton from "@/components/CouponSkeleton";

export default function ResultatsPage() {
  const [date, setDate] = useState(todayISO());

  const { data, isLoading } = useQuery({
    queryKey: ["results", date],
    queryFn: () => fetchResults(date),
  });

  return (
    <div className="mx-auto max-w-md px-4 pt-8">
      <h1 className="mb-4 font-serif text-xl font-semibold text-secondary-800">Résultats</h1>

      <input
        type="date"
        value={date}
        max={todayISO()}
        onChange={(event) => setDate(event.target.value)}
        className="mb-6 w-full rounded-lg border border-muted bg-white px-4 py-2.5 text-sm text-secondary-800 outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <div className="space-y-4">
        {isLoading && Array.from({ length: 3 }).map((_, index) => <CouponSkeleton key={index} />)}

        {!isLoading && data?.coupons.length === 0 && (
          <p className="py-10 text-center text-sm text-secondary-400">
            Aucun résultat pour cette date.
          </p>
        )}

        {!isLoading && data?.coupons.map((coupon) => <ResultCard key={coupon.id} coupon={coupon} />)}
      </div>
    </div>
  );
}
