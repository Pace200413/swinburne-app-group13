"use client";

import { useEffect, useState } from "react";
import type { CampusEvent } from "@/lib/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { gmDirectionsUrl } from "@/lib/maps";

export default function EventActionBar({ ev }: { ev: CampusEvent }) {
  const { isSaved, toggle } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setMounted(true), []);

  const saved = mounted ? isSaved(ev.id) : false;

  useEffect(() => {
    const el = document.getElementById("event-hero-end");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: "56px" }} aria-hidden />
      <div
        className={`fixed bottom-0 inset-x-0 z-30 border-t bg-white/95 backdrop-blur pb-[max(env(safe-area-inset-bottom),0px)] transition-transform duration-150 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="maxw container-px py-2 grid grid-cols-3 gap-6">
          <a
            href={gmDirectionsUrl({ lat: ev.lat, lng: ev.lng, address: ev.venue })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-8 rounded-full bg-[var(--brand-red,#D42A30)] text-white px-3 text-xs font-medium"
            title="Directions in Google Maps"
          >
            Go
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (mounted) toggle(ev.id);
            }}
            disabled={!mounted}
            className={`inline-flex items-center justify-center h-8 rounded-full border px-3 text-xs transition-all duration-200 ${
              saved 
                ? "bg-[var(--brand-red,#D42A30)] text-white border-[var(--brand-red,#D42A30)] shadow-sm" 
                : "bg-white text-slate-600 border-slate-300 hover:border-[var(--brand-red,#D42A30)] hover:text-[var(--brand-red,#D42A30)]"
            } ${!mounted ? "opacity-50" : ""}`}
            title={saved ? "Remove bookmark" : "Bookmark"}
          >
            <span suppressHydrationWarning>{saved ? "★ Saved" : "☆ Save"}</span>
          </button>
          <button
            onClick={() => {
              const d = (x: Date) => x.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
              const s = new Date(ev.date), e = new Date(ev.endDate || ev.date);
              const ics = [
                "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Swinburne//Events//EN","BEGIN:VEVENT",
                `UID:${ev.id}@swin-app`,`DTSTAMP:${d(s)}`,`DTSTART:${d(s)}`,`DTEND:${d(e)}`,
                `SUMMARY:${ev.title}`,`LOCATION:${ev.venue}`,
                `DESCRIPTION:${(ev.description || "").replace(/\n/g, "\\n")}`,
                "END:VEVENT","END:VCALENDAR",
              ].join("\r\n");
              const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${ev.title.replace(/\s+/g, "_")}.ics`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center justify-center h-8 rounded-full border px-3 text-xs"
            title="Add to calendar"
          >
            ⋯
          </button>
        </div>
      </div>
    </>
  );
}
