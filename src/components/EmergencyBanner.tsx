"use client";
export default function EmergencyBanner({ phone }: { phone: string }) {
  return (
    
    <div
      role="note"
      aria-label="Emergency notice"
      className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden>🚨</span>
        <p className="flex-1">
          Need urgent help? Call Campus Security{" "}
          <a className="underline font-semibold" href={`tel:${phone}`}>{phone}</a> — available 24/7.
        </p>
        <a
          href={`tel:${phone}`}
          className="hidden sm:inline-flex rounded-lg bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-700"
        >
          Call now
        </a>
      </div>
    </div>
  );
}
