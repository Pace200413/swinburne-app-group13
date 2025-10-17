"use client";
import evs from "@/data/events.json";
import { makeICS, downloadICS } from "@/lib/ics";
import { mapsUrl } from "@/lib/maps";

type Ev = { id: string; title: string; date: string; location: string; type: string };

export default function EventsPreview() {
  const list = (evs as Ev[])
    .slice()
    .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0,3);

  return (
    <div className="mt-4">
      <div className="mb-2 text-sm text-gray-600">Coming up</div>
      <div className="grid sm:grid-cols-3 gap-3">
        {list.map(e => (
          <div key={e.id} className="rounded-xl border bg-white p-3 shadow hover:shadow-md transition">
            <div className="font-medium">{e.title}</div>
            <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()} • {e.location}</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => downloadICS(`${e.title}.ics`, makeICS({ title: e.title, startISO: e.date, location: e.location }))}
                className="rounded border px-2 py-1 text-xs hover:border-[#D42A30] hover:text-[#D42A30]"
              >
                Add to calendar
              </button>
              <a
                href={mapsUrl(e.location)} target="_blank" rel="noreferrer"
                className="rounded border px-2 py-1 text-xs hover:border-[#D42A30] hover:text-[#D42A30]"
              >
                Open in Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
