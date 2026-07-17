import { ListChecks } from "lucide-react";
import Badge from "./Badge";
import LockIcon from "./LockIcon";
import type { Coupon, CouponClass } from "@/types";

const CLASS_LABEL: Record<CouponClass, string> = {
  safe: "Safe",
  opportunite: "Opportunités",
  risk: "Risk",
};

export default function CouponCard({
  coupon,
  onViewDetails,
}: {
  coupon: Coupon;
  onViewDetails: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-muted bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover ${
        coupon.is_locked ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-muted/70 px-4 py-3">
        <Badge classe={coupon.classe}>{CLASS_LABEL[coupon.classe]}</Badge>
        <span className="font-mono text-xs tabular-nums text-secondary-500">
          {coupon.odds_min.toFixed(2)} – {coupon.odds_max.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-secondary-700">
          <ListChecks size={18} strokeWidth={1.75} className="text-secondary-400" />
          <span>{coupon.match_count} matchs</span>
        </div>

        {!coupon.is_locked && (
          <button
            type="button"
            onClick={onViewDetails}
            className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5"
          >
            Voir détails
          </button>
        )}
      </div>

      {coupon.is_locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-secondary-800 px-4 py-2 text-xs font-semibold text-white shadow-lg"
          >
            <LockIcon size={14} />
            Débloquer
          </button>
        </div>
      )}
    </div>
  );
}
