"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Service } from "../app/types/support";
import Fuse, { type IFuseOptions } from "fuse.js";
import { track } from "@/lib/analytics";

const CATS = ["All", "IT Support", "Facilities", "Safety", "Wellbeing", "Academic"] as const;

const TONE: Record<string, string> = {
  "IT Support": "ring-sky-200 bg-sky-50",
  Facilities: "ring-amber-200 bg-amber-50",
  Safety: "ring-rose-200 bg-rose-50",
  Wellbeing: "ring-emerald-200 bg-emerald-50",
  Academic: "ring-violet-200 bg-violet-50",
};

function CatBadge({ cat }: { cat: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ${
        TONE[cat] ?? "ring-slate-200 bg-slate-50"
      }`}
    >
      {cat}
    </span>
  );
}

function ServiceIcon({ cat }: { cat: string }) {
  const cls = "h-4 w-4";
  if (cat === "Facilities") return <svg aria-hidden="true" className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M4 13h16v7H4zM6 4h12l2 7H4z"/></svg>;
  if (cat === "Safety") return <svg aria-hidden="true" className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 3v6c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V5l7-3z"/></svg>;
  if (cat === "Wellbeing") return <svg aria-hidden="true" className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-7-10a4 4 0 018-1 4 4 0 018 1c0 5.65-7 10-7 10z"/></svg>;
  if (cat === "Academic") return <svg aria-hidden="true" className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l10 5-10 5L2 8l10-5zm0 7l6.5-3.25V14L12 17l-6.5-3V6.75z"/></svg>;
  return <svg aria-hidden="true" className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v14H3z"/></svg>;
}

function DirectorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="h-full animate-pulse rounded-xl bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

/* ---------- Fuzzy search setup ---------- */
const FUSE_OPTS: IFuseOptions<Service> = {
  keys: [
    { name: "name",     weight: 0.6 },
    { name: "desc",     weight: 0.3 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
};

export default function SupportDirectory({
  services,
  preset,
}: {
  services: Service[];
  preset?: { cat?: string; q?: string };
}) {
  const [cat, setCat] = useState<(typeof CATS)[number]>(
    (preset?.cat as (typeof CATS)[number]) ?? "All"
  );
  const [q, setQ] = useState(preset?.q ?? "");
  const [hydrated, setHydrated] = useState(false);
  const [debouncedQ, setDebouncedQ] = useState(q);

  // ensure skeleton only shows pre-hydration
  useEffect(() => { setHydrated(true); }, []);

  // debounce search & analytics
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(q);
      if (q.trim()) track("support_search", { q, cat });
    }, 180);
    return () => clearTimeout(t);
  }, [q, cat]);

  const fuseAll = useMemo(() => new Fuse<Service>(services, FUSE_OPTS), [services]);

  const filtered = useMemo(() => {
    const subset = cat === "All" ? services : services.filter(s => s.category === cat);
    if (!debouncedQ.trim()) return subset;
    const idx = new Fuse<Service>(subset, FUSE_OPTS);
    return idx.search(debouncedQ).map(r => r.item);
  }, [services, cat, debouncedQ]);


  if (!hydrated) return <DirectorySkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-xs focus-visible:ring-2 focus-visible:ring-slate-300 ${
              cat === c ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 bg-white hover:bg-slate-50"
            }`}
            aria-pressed={cat === c}
          >
            {c}
          </button>
        ))}
        <input
          placeholder="Search services…"
          className="ml-auto input !h-9 w-56"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search support services"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((s) => (
          <Link
            key={s.slug}
            href={`/support/${s.slug}`}
            onClick={() => track("support_card_click", { slug: s.slug })}
            className="rounded-2xl border border-slate-200 bg-white p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300
                       transition [@media(hover:hover)]:hover:shadow-md [@media(hover:hover)]:hover:-translate-y-0.5"
            aria-label={`Open ${s.name} details`}
          >
            <div className="flex items-start gap-3">
              <span
                className="inline-grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-slate-200/70 shadow-sm text-slate-700"
                aria-hidden="true"
              >
                <ServiceIcon cat={s.category} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold">{s.name}</h3>
                  <CatBadge cat={s.category} />
                </div>
                <div className="text-xs text-slate-500">{s.hours}</div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-700">{s.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-slate-700 underline">
                  <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/><path d="M5 5h6V3H3v8h2V5z"/>
                  </svg>
                  View details
                </span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            No matching services. Try a different search or category.
          </div>
        )}
      </div>
    </div>
  );
}
