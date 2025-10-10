function Dot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-500" : "bg-amber-500"}`}
      aria-hidden="true"
    />
  );
}

// Export so other components (IncidentBanner) can use the same source
export const STATUS_ITEMS = [
  { name: "Canvas", ok: true },
  { name: "Student Portal", ok: true },
  { name: "Wi-Fi", ok: true },
];

export default function ServiceStatusBar({ items = STATUS_ITEMS }: { items?: { name: string; ok: boolean }[] }) {
  return (
    <div className="maxw container-px mt-3">
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
          {items.map((s) => (
            <li key={s.name} className="inline-flex items-center gap-2">
              <Dot ok={s.ok} />
              <span className="font-medium">{s.name}</span>
              <span className="text-slate-400">•</span>
              <span className={s.ok ? "text-emerald-600" : "text-amber-700"}>
                {s.ok ? "Operational" : "Issue detected"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}