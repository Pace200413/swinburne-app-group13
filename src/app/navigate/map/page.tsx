/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

type Dot = { id: number; left: string; top: string };

const DOTS: Dot[] = [
  { id: 1,  left: "21.55%", top: "29.04%" },
  { id: 2,  left: "50.50%", top: "28.92%" },
  { id: 3,  left: "70.25%", top: "24.88%" },
  { id: 4,  left: "76.93%", top: "15.92%" },
  { id: 5,  left: "83.11%", top: "31.38%" },
  { id: 6,  left: "81.53%", top: "44.92%" },
  { id: 7,  left: "89.03%", top: "39.15%" },
  { id: 8,  left: "71.00%", top: "57.58%" },
  { id: 9,  left: "66.20%", top: "49.58%" },
  { id:10,  left: "58.22%", top: "47.58%" },
  { id:11,  left: "48.87%", top: "64.08%" },
  { id:12,  left: "47.22%", top: "47.58%" },
  { id:13,  left: "36.05%", top: "55.80%" },
  { id:14,  left: "21.70%", top: "57.69%" },
  { id:15,  left: "28.90%", top: "59.69%" },
];

const INFO: Record<number, { title?: string; img?: string; desc?: string }> = {
  15: { title: "Borneo Atrium", img: "/images/borneo2.png", desc: "Main atrium area beside Block G; common event space." },
  13: { title: "Checkpoint 1",  img: "/images/checkpoint1.jpg", desc: "Entrance corridor near reception." },
  1:  { title: "Carpark Building", img: "/images/carpark.jpg", desc: "Multi-storey parking; access via Jalan Uplands." },
  2:  { title: "Central Courtyard", img: "images/courtyard.jpg", desc: "Open space with seating and trees." },
};

export default function CampusMapPage() {
  return (
    <>
      <section className="intro">
        <h1 className="h1">Swinburne Sarawak Campus Map</h1>
        <p className="lede">
          Explore key buildings and facilities around campus. Hover or focus the blue dots to see
          details; on touch devices, tap a dot to reveal its info.
        </p>

        <div className="info-grid">
          <div className="card">
            <h2 className="h2">How to use</h2>
            <ul className="list">
              <li>Hover or tap the blue dots for building names and descriptions.</li>
              <li>Use pinch-to-zoom in your browser (Ctrl/⌘+) if you need a closer look.</li>
              <li>For accessibility, navigate dots with Tab and press Enter to open the tooltip.</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="h2">What’s on this map</h2>
            <ul className="list">
              <li>Teaching blocks, labs and lecture theatres</li>
              <li>Student services and common areas</li>
              <li>Carpark, outdoor field and nearby access roads</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div id="map" className="map-frame" data-tip-theme="dark">
          <img
            src="/images/campus-map.jpg"
            alt="Campus map"
            className="block w-full h-auto select-none rounded-[14px]"
          />

          {DOTS.map((d) => (
            <button
              key={d.id}
              className="dot"
              style={{ left: d.left, top: d.top } as React.CSSProperties}
              aria-label={`Location ${d.id}`}
            >
              <div className="tip">
                {INFO[d.id]?.img && <img src={INFO[d.id]!.img!} alt={INFO[d.id]?.title || ""} />}
                <div className="title">{INFO[d.id]?.title ?? `Location #${d.id}`}</div>
                <div className="desc">{INFO[d.id]?.desc ?? "Tooltip content coming soon."}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        :root { --dot-size: 30px; }

        .intro { max-width: 800px; margin: 24px auto 8px; padding: 0 16px; }
        .h1 { margin: 0 0 6px; font-weight: 800; font-size: clamp(24px, 3vw, 32px); color: #0f172a; }
        .h2 { margin: 0 0 8px; font-weight: 700; font-size: 16px; color: #0f172a; }
        .lede { margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155; }

        .info-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 720px) { .info-grid { grid-template-columns: 1fr 1fr; } }

        .card {
          background: #fff; border: 1px solid rgba(2,6,23,.06); border-radius: 12px;
          padding: 12px 14px; box-shadow: 0 6px 18px rgba(2,6,23,.06);
        }
        .list { margin: 0; padding-left: 18px; color: #475569; line-height: 1.55; font-size: 14px; }
        .list li { margin: 6px 0; }

        .wrap { max-width: 700px; margin: 0 auto; padding: 16px; }
        #map { position: relative; z-index: 5000; overflow: visible !important; }
        .map-frame { position: relative; width: 100%; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
        .map-frame img { display: block; width: 100%; height: auto; user-select: none; }

        .dot {
          position: absolute; width: var(--dot-size); height: var(--dot-size);
          transform: translate(-50%, -50%); display: grid; place-items: center;
          border-radius: 999px; border: 3px solid rgba(255,255,255,.85);
          background: #1976ff; cursor: default; z-index: 1;
        }
        .dot:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
        .dot::after {
          content: ""; position: absolute; inset: -6px; border-radius: inherit;
          border: 2px solid rgba(25,118,255,.35); animation: pulse 1.8s infinite; z-index: 0;
        }
        @keyframes pulse { 0% { transform: scale(0.9); opacity: .8; } 70% { transform: scale(1.2); opacity: 0; } 100% { opacity: 0; } }
        .dot:hover, .dot:focus-visible { z-index: 9999; }

        .dot .tip {
          position: absolute; left: 50%; bottom: calc(100% + 12px);
          transform: translateX(-50%) translateY(6px); width: 260px;
          background: rgba(255,255,255,0.98); color: #0f172a; border-radius: 14px;
          border: 1px solid rgba(2,6,23,.06);
          box-shadow: 0 12px 28px rgba(2,6,23,.18), 0 2px 6px rgba(2,6,23,.06);
          padding: 10px; display: none; pointer-events: none; z-index: 2;
          animation: tip-fade-up 160ms ease-out both;
        }
        .dot:hover .tip, .dot:focus-visible .tip { display: block; }

        @keyframes tip-fade-up {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .tip img {
          width: 100%; height: 140px; object-fit: cover; border-radius: 10px; display: block;
          box-shadow: inset 0 0 0 1px rgba(2,6,23,.06);
        }
        .tip .title { margin-top: 8px; font-weight: 700; font-size: 15px; line-height: 1.25; letter-spacing: .2px; }
        .tip .desc  { margin-top: 4px; font-size: 13px; line-height: 1.45; color: #334155; }
        @media (max-width: 420px) { .dot .tip { width: 220px; } }
      `}</style>
    </>
  );
}
