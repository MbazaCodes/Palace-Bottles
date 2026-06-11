export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal to-navy font-display text-lg font-extrabold text-white shadow-glass">
        B
      </span>
      <span className={`font-display text-lg font-bold leading-tight ${dark ? "text-navy" : "text-white"}`}>
        Palace<br className="hidden" /> Bottles
      </span>
    </span>
  );
}
