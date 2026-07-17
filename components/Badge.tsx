import type { CouponClass } from "@/types";

const STYLES: Record<CouponClass, string> = {
  safe: "bg-emerald-600",
  opportunite: "bg-accent",
  risk: "bg-red-600",
};

export default function Badge({
  classe,
  children,
}: {
  classe: CouponClass;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${STYLES[classe]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {children}
    </span>
  );
}
