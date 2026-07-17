import { cn } from "@/lib/utils";

export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn("bg-shimmer animate-shimmer rounded-md", className)}
      aria-hidden="true"
    />
  );
}
