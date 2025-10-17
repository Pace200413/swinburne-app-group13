"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventActionBar from "@/app/events/EventActionBar";
import type { CampusEvent } from "@/lib/types";
import EVENTS from "@/app/data/events";
import { useBookmarks } from "@/hooks/useBookmarks";

const DATA: CampusEvent[] = EVENTS;

function fmtUTC(dt: string) {
  const d = new Date(dt);
  const WD = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${WD[d.getUTCDay()]}, ${String(d.getUTCDate()).padStart(2, "0")} ${MN[d.getUTCMonth()]} ${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const ev = DATA.find((e) => e.id === id);
  const { isSaved, toggle } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!ev) {
    return (
      <main className="maxw container-px py-10">
        <p className="text-sm text-slate-600">Event not found.</p>
        <Link href="/events" className="text-[var(--brand-red,#D42A30)] hover:underline">← Back to Events</Link>
      </main>
    );
  }

  const saved = mounted ? isSaved(ev.id) : false;

  return (
    <main className="bg-white">
      <a href={ev.image || "/images/swinburne-logo.jpg"} target="_blank" rel="noopener noreferrer" className="relative block h-40 w-full overflow-hidden" title="Open image">
        <Image src={ev.image || "/images/swinburne-logo.jpg"} alt="" fill className="object-cover" />
      </a>
      <div id="event-hero-end" />

      <div className="maxw container-px py-4 space-y-3">
        <Link href="/events" className="text-xs text-[var(--brand-red,#D42A30)] hover:underline">← Events</Link>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center text-[10px] font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
            {ev.category}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (mounted) toggle(ev.id); }}
            disabled={!mounted}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 ${
              saved 
                ? "bg-[var(--brand-red,#D42A30)] text-white border-[var(--brand-red,#D42A30)] shadow-sm" 
                : "bg-white text-slate-600 border-slate-300 hover:border-[var(--brand-red,#D42A30)] hover:text-[var(--brand-red,#D42A30)]"
            } ${!mounted ? "opacity-50" : ""}`}
            title={saved ? "Remove bookmark" : "Bookmark"}
          >
            <span suppressHydrationWarning>{saved ? "★ Saved" : "☆ Save"}</span>
          </button>
        </div>

        <h1 className="text-[16px] font-semibold leading-snug line-clamp-2">{ev.title}</h1>

        <div className="text-[13px] text-slate-700 space-y-1 rounded-xl border p-3">
          <div>🗓 {fmtUTC(ev.date)}{ev.endDate ? ` — ${fmtUTC(ev.endDate)}` : ""}</div>
          <div>📍 {ev.venue}</div>
        </div>

        {ev.description && <p className="text-[13px] text-slate-700">{ev.description}</p>}
      </div>

      <EventActionBar ev={ev} />
    </main>
  );
}
