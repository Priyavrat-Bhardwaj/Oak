// OAK's brand motif: an incomplete ring the eye completes (Gestalt closure).
export function ClosureMark({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 4a16 16 0 0 1 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M36 26a16 16 0 0 1-12 9.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 35.5A16 16 0 0 1 4 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 14A16 16 0 0 1 13 5.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
