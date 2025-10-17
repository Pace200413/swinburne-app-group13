"use client";

import Link from "next/link";
import { CampusEvent } from "@/lib/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { gmSearchUrl } from "@/lib/maps";
import { useState, useEffect } from "react";

function tUTC(iso: string) {
  const d = new Date(iso);
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}

export default function EventRow({ ev }: { ev: CampusEvent }) {
  const { isSaved, toggle } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  useEffect(() => setMounted(true), []);
  
  const saved = mounted ? isSaved(ev.id) : false;

  const mapHref = gmSearchUrl({ lat: ev.lat, lng: ev.lng, address: ev.venue });

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!mounted) return;
    
    const wasSaved = saved;
    toggle(ev.id);
    setToast(!wasSaved ? "Saved" : "Removed");
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[56px_1fr_auto] items-center gap-3 py-2">
        <div className="text-right text-[12px] text-slate-500 pr-1 font-mono tabular-nums">{tUTC(ev.date)}</div>

        <Link href={`/events/${ev.id}`} className="min-w-0">
          <h3 className="text-[14px] font-medium leading-snug truncate">{ev.title}</h3>
          <p className="text-[12px] text-slate-600 truncate">{ev.venue}</p>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="h-7 inline-flex items-center justify-center rounded-full bg-[var(--brand-red,#D42A30)] text-white px-2.5 text-[11px] font-medium"
            title="Open in Google Maps"
          >
            Go
          </a>
          <button
            onClick={onToggle}
            disabled={!mounted}
            className={`h-7 inline-flex items-center justify-center rounded-full border px-2.5 text-[11px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red,#D42A30)] focus:ring-opacity-30 active:scale-95 ${
              saved 
                ? "bg-[var(--brand-red,#D42A30)] text-white border-[var(--brand-red,#D42A30)] shadow-sm" 
                : "bg-white text-slate-600 border-slate-300 hover:border-[var(--brand-red,#D42A30)] hover:text-[var(--brand-red,#D42A30)]"
            } ${!mounted ? "opacity-50" : ""}`}
            title={saved ? "Remove bookmark" : "Bookmark"}
          >
            <span suppressHydrationWarning>{saved ? "★" : "☆"}</span>
          </button>
          <Link
            href={`/events/${ev.id}`}
            className="h-7 inline-flex items-center justify-center rounded-full border px-2.5 text-[11px]"
          >
            ↗︎
          </Link>
        </div>
      </div>
      <div className="h-px bg-slate-200" />
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[9999] text-[11px] px-3 py-2 rounded-full bg-black/90 text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
