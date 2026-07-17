import Skeleton from "./Skeleton";

export default function CouponSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-muted bg-white">
      <div className="flex items-center justify-between border-b border-muted/70 px-4 py-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center justify-between px-4 py-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
