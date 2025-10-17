"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CampusEvent } from "@/lib/types";
import { useBookmarks } from "@/hooks/useBookmarks";

/* ---------- UTC helpers ---------- */
function inTodayUTC(d: Date, now = new Date()) {
  const y = now.getUTCFullYear(), m = now.getUTCMonth(), da = now.getUTCDate();
  const s = new Date(Date.UTC(y, m, da, 0, 0, 0, 0));
  const e = new Date(Date.UTC(y, m, da, 23, 59, 59, 999));
  return d >= s && d <= e;
}
function inISOWeekUTC(d: Date, now = new Date()) {
  const base = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const wd = (base.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  const s = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() - wd, 0, 0, 0, 0));
  const e = new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate() + 6, 23, 59, 59, 999));
  return d >= s && d <= e;
}

export type FilterState = {
  q: string;
  range: "today" | "week" | "month" | "all";
  cats: string[];
  when: "upcoming" | "past" | "all";
  onlySaved: boolean;
};

type Props = { data: CampusEvent[]; onChange: (list: CampusEvent[], state: FilterState) => void };

export default function EventsFilterBar({ data, onChange }: Props) {
  // minimal surface
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  // drawer filters
  const [range, setRange] = useState<FilterState["range"]>("all");
  const [cats, setCats] = useState<string[]>([]);
  const [when, setWhen] = useState<FilterState["when"]>("all");
  const [onlySaved, setOnlySaved] = useState(false);

  // bookmarks (single truth)
  const { map, ids } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  // Auto-disable saved filter if no bookmarks exist
  useEffect(() => {
    if (onlySaved && mounted && ids.length === 0) {
      setOnlySaved(false);
    }
  }, [onlySaved, mounted, ids.length]);

  const allCats = useMemo(() => Array.from(new Set(data.map((e) => e.category))).sort(), [data]);

  // compute filtered list (no render loops)
  useEffect(() => {
    const now = new Date();
    let list = data;

    if (onlySaved && mounted) {
      list = list.filter((e) => map.has(e.id));
    }

    if (range !== "all") {
      list = list.filter((e) => {
        const d = new Date(e.date);
        if (range === "today") return inTodayUTC(d, now);
        if (range === "week") return inISOWeekUTC(d, now);
        if (range === "month")
          return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth();
        return true;
      });
    }

    if (when !== "all") {
      list = list.filter((e) => (when === "upcoming" ? new Date(e.date) >= now : new Date(e.date) < now));
    }

    if (q.trim()) {
      const t = q.trim().toLowerCase();
      list = list.filter((e) => (e.title + " " + e.description + " " + e.venue).toLowerCase().includes(t));
    }

    if (cats.length) list = list.filter((e) => cats.includes(e.category));

    list = list.slice().sort((a, b) => +new Date(a.date) - +new Date(b.date));

    onChange(list, { q, range, cats, when, onlySaved });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, range, cats, when, onlySaved, data, map, ids, mounted]);

  const chips: string[] = [];
  if (onlySaved) chips.push("Saved");
  if (range !== "all") chips.push(range === "week" ? "This week" : range === "month" ? "This month" : "Today");
  chips.push(...cats);

  const portalReady = typeof document !== "undefined";

  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="maxw container-px py-3 space-y-3">
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events…"
              className="w-full rounded-lg border pl-3 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              type="search"
              aria-label="Search events"
            />
          </div>

          {/* Saved button - prominent */}
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            disabled={!mounted || ids.length === 0}
            className={`px-3 py-1.5 text-[12px] rounded-full border transition-all duration-200 ${
              onlySaved 
                ? "bg-[var(--brand-red,#D42A30)] text-white border-[var(--brand-red,#D42A30)] shadow-sm" 
                : mounted && ids.length > 0
                ? "bg-white text-slate-600 border-slate-300 hover:border-[var(--brand-red,#D42A30)] hover:text-[var(--brand-red,#D42A30)]"
                : "bg-white text-slate-400 border-slate-200 opacity-50"
            }`}
            title={onlySaved ? "Show all events" : mounted ? `Show ${ids.length} saved event${ids.length !== 1 ? 's' : ''}` : "No saved events"}
          >
            {onlySaved ? "★ Saved" : mounted ? `☆ Saved${ids.length > 0 ? ` (${ids.length})` : ''}` : "☆ Saved"}
          </button>

          {/* Filters button */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border px-3 py-1.5 text-[12px] bg-white"
            aria-haspopup="dialog"
          >
            Filters
          </button>
        </div>

        {/* Active chips (only when something applied) */}
        {chips.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {chips.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] bg-white">
                {c}
                <button
                  className="text-slate-500"
                  onClick={() => {
                    if (c === "Saved") setOnlySaved(false);
                    else if (c === "Today" || c === "This week" || c === "This month") setRange("all");
                    else setCats((prev) => prev.filter((x) => x !== c));
                  }}
                  aria-label={`Remove ${c}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Drawer (portal) */}
      {portalReady &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[1000]">
            <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[84%] max-w-sm bg-white shadow-xl p-4 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Filters</h3>
                <button onClick={() => setOpen(false)} className="text-sm px-3 py-1 rounded border">
                  Close
                </button>
              </div>

              <div className="mt-4 space-y-4">

                <section>
                  <p className="text-xs font-medium text-slate-600 mb-2">Date range</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {(["today", "week", "month", "all"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`px-3 py-1.5 text-sm rounded-full border ${range === r ? "bg-slate-900 text-white" : ""}`}
                      >
                        {r === "all" ? "All dates" : r === "week" ? "This week" : r === "month" ? "This month" : "Today"}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="text-xs font-medium text-slate-600 mb-2">When</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {(["upcoming", "all", "past"] as const).map((w) => (
                      <button
                        key={w}
                        onClick={() => setWhen(w)}
                        className={`px-3 py-1.5 text-sm rounded-full border ${when === w ? "bg-slate-900 text-white" : ""}`}
                      >
                        {w[0].toUpperCase() + w.slice(1)}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="text-xs font-medium text-slate-600 mb-2">Categories</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {allCats.map((c) => {
                      const on = cats.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() => setCats((prev) => (on ? prev.filter((x) => x !== c) : [...prev, c]))}
                          className={`px-3 py-1.5 text-sm rounded-full border ${on ? "bg-slate-900 text-white" : ""}`}
                        >
                          {c}
                        </button>
                      );
                    })}
                    {cats.length > 0 && (
                      <button onClick={() => setCats([])} className="px-3 py-1.5 text-sm rounded-full border">
                        Clear
                      </button>
                    )}
                  </div>
                </section>

                <button
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-slate-900 text-white px-4 py-2.5 font-medium mt-2"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
