export function SectionDivider() {
  return (
    <div className="relative h-24 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-2 w-2 rotate-45 border border-rose-500/30" />
      </div>
    </div>
  );
}