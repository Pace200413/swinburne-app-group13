"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import EventsFilterBar, { type FilterState } from "@/app/events/EventsFilterBar";
import EventRow from "@/app/events/EventRow";
import type { CampusEvent } from "@/lib/types";
import EVENTS from "@/app/data/events";
import Image from "next/image";

/* ---------- data ---------- */
const ALL: CampusEvent[] = EVENTS;

/* ---------- UTC-safe date helpers ---------- */
function ymdUTC(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
function dayLabelUTC(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const WD = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const today = new Date();
  const tk = ymdUTC(today.toISOString());
  const tmr = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));
  const tmk = ymdUTC(tmr.toISOString());
  if (key === tk) return "Today";
  if (key === tmk) return "Tomorrow";
  return `${WD[dt.getUTCDay()]}, ${String(d).padStart(2, "0")} ${MN[dt.getUTCMonth()]} ${y}`;
}
function group(list: CampusEvent[]) {
  const map = new Map<string, CampusEvent[]>();
  for (const e of list) {
    const k = ymdUTC(e.date);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(e);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

/* ---------- Hero ---------- */
function HeroImage() {
  const [error, setError] = useState(false);
  const src = error ? "/images/swinburne-logo.jpg" : "/images/sample.jpg";
  return (
    <Image src={src} alt="" fill priority onError={() => setError(true)} className="object-cover saturate-[.9] contrast-[1.05]" />
  );
}

/* ---------- Page ---------- */
export default function EventsPage() {
  const data = useMemo(() => ALL.slice().sort((a, b) => +new Date(a.date) - +new Date(b.date)), []);
  const [list, setList] = useState<CampusEvent[]>(data);
  const [_filters, setFilters] = useState<FilterState | null>(null);
  const groups = useMemo(() => group(list), [list]);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <header className="relative h-[32vh] min-h-[220px] overflow-hidden">
        <HeroImage />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0" />
        <div className="absolute bottom-4 left-0 right-0 maxw container-px">
          <h1 className="text-white/95 text-[20px] font-semibold">Events</h1>
          <p className="text-white/90 text-[13px]">Find what’s on — get there fast.</p>
        </div>
      </header>

      <EventsFilterBar
        data={data}
        onChange={(filtered, s) => {
          setList(filtered);
          setFilters(s);
        }}
      />

      <div ref={topRef} />
      <section className="maxw container-px pb-20">
        {groups.length === 0 && (
          <div className="text-[12px] text-slate-500 py-6">No events for these filters. Clear filters.</div>
        )}
        {groups.map(([key, items]) => (
          <div key={key} className="mb-2">
            <div className="sticky top-[52px] z-[1] bg-white/90 backdrop-blur">
              <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700 py-1">
                <span className="inline-block h-4 w-1.5 bg-[var(--brand-red,#D42A30)] rounded-sm" />
                <h2 suppressHydrationWarning>{dayLabelUTC(key)}</h2>
                <span className="text-[11px] text-slate-500">• {items.length}</span>
              </div>
              <div className="h-px bg-slate-200" />
            </div>

            <div className="divide-y divide-slate-200">
              {items.map((ev) => (
                <EventRow key={ev.id} ev={ev} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <a
        href="https://www.google.com/maps/search/?api=1&query=Swinburne%20Sarawak"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 z-20 h-12 w-12 grid place-items-center rounded-full bg-[var(--brand-red,#D42A30)] text-white shadow-lg"
        title="Open campus in Google Maps"
      >
        ➔
      </a>

      {showTop && (
        <button
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] right-4 z-20 rounded-full bg-slate-900 text-white px-3 py-2 shadow-lg"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
