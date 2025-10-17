"use client";

import { useState } from "react";
import QuickActions from "@/components/QuickActions";
import EventsPreview from "@/components/EventsPreview";
import FeatureBanner from "@/components/FeatureBanner";

function SegmentButton({
  id,
  active,
  label,
  onClick,
}: {
  id: string;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition
        ${
          active
            ? "bg-brand-red text-white border-brand-red"
            : "bg-white border-slate-300 hover:border-brand-red hover:text-brand-red"
        }`}
    >
      {label}
    </button>
  );
}

export default function TopSegments() {
  const [tab, setTab] = useState<
    "emergency" | "navigate" | "support" | "events"
  >("emergency");

  return (
    <div className="grid gap-4">
      {/* Segmented Control */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <SegmentButton
          id="emergency"
          active={tab === "emergency"}
          label="🚨 Emergency"
          onClick={() => setTab("emergency")}
        />
        <SegmentButton
          id="navigate"
          active={tab === "navigate"}
          label="🧭 Navigate"
          onClick={() => setTab("navigate")}
        />
        <SegmentButton
          id="support"
          active={tab === "support"}
          label="💬 Support"
          onClick={() => setTab("support")}
        />
        <SegmentButton
          id="events"
          active={tab === "events"}
          label="📅 Events"
          onClick={() => setTab("events")}
        />
      </div>

      {/* Panels */}
      <div className="rounded-2xl border bg-white p-5 shadow-tile">
        {tab === "emergency" && (
          <div className="grid gap-3">
            <FeatureBanner />
            <a
              href="/emergency"
              className="rounded-xl bg-brand-red text-white px-4 py-3 text-center font-semibold shadow hover:opacity-90 transition"
            >
              📞 Call Campus Security
            </a>
            <p className="text-xs text-gray-500">
              Direct security contact with optional one-tap location sharing.
            </p>
          </div>
        )}

        {tab === "navigate" && (
          <div className="grid gap-4">
            <QuickActions />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href="/menu"
                className="rounded-xl border p-3 text-center hover:border-brand-red transition"
              >
                🍽️ Dining
              </a>
              <a
                href="/menu"
                className="rounded-xl border p-3 text-center hover:border-brand-red transition"
              >
                🅿️ Parking
              </a>
              <a
                href="/menu"
                className="rounded-xl border p-3 text-center hover:border-brand-red transition"
              >
                📚 Study Spaces
              </a>
              <a
                href="/menu"
                className="rounded-xl border p-3 text-center hover:border-brand-red transition"
              >
                🗺️ Campus Map
              </a>
            </div>
          </div>
        )}

        {tab === "support" && (
          <div className="grid gap-3">
            <p className="text-sm text-gray-700">
              Live chat for enquiries. After hours, leave a request and IT
              Services will respond.
            </p>
            <a
              href="/messages"
              className="rounded-xl bg-black text-white px-4 py-3 text-center shadow hover:opacity-90 transition"
            >
              💬 Open Live Chat
            </a>
          </div>
        )}

        {tab === "events" && (
          <div className="grid gap-4">
            <EventsPreview />
            <div className="flex gap-2">
              <a
                href="/events"
                className="rounded-xl border px-3 py-2 text-sm hover:border-brand-red transition"
              >
                Browse all
              </a>
              <a
                href="/favourites"
                className="rounded-xl border px-3 py-2 text-sm hover:border-brand-red transition"
              >
                Bookmarks
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
