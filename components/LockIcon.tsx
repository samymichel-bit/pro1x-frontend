export default function LockIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 11V7.5a4 4 0 0 1 8 0V11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.2" r="1.1" fill="currentColor" />
    </svg>
  );
}
