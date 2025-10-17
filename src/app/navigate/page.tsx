"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaMapMarkedAlt,
  FaUtensils,
  FaParking,
  FaBook,
  FaBookOpen,
  FaInfoCircle,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";
import SubpageLayout from "@/components/SubpageLayout";
import type React from "react";

// Type-only (kept minimal to avoid conflicts)
import type { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";

/* ---------- helpers ---------- */
function getSpeechRecognition(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  return (
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ??
    window.webkitSpeechRecognition ??
    null
  );
}

type Hours = { open: string; close: string };
const _mins = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const isOpenNow = (h?: Hours) => {
  if (!h) return undefined;
  const now = new Date(), cur = now.getHours() * 60 + now.getMinutes();
  const a = _mins(h.open), b = _mins(h.close);
  return b < a ? cur >= a || cur < b : cur >= a && cur < b;
};

/* ---------- SearchBar ---------- */
function SearchBar({
  onSearch,
  onSubmit,
  onScan,
  className = "",
  defaultValue = "",
}: {
  onSearch?: (q: string) => void;
  onSubmit?: (q: string) => void;
  onScan?: () => void;
  className?: string;
  defaultValue?: string;
}) {
  const [q, setQ] = useState(defaultValue);
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!onSearch) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      onSearch(q.trim());
      setIsTyping(false);
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [q, onSearch]);

  useEffect(() => {
    const Ctor = getSpeechRecognition();
    if (!Ctor) return;

    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    recognitionRef.current = rec;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let text = "";
      let isFinal = false;
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res: SpeechRecognitionResult = e.results[i];
        text += res[0].transcript;
        if (res.isFinal) isFinal = true;
      }
      setQ(text.trim());
      setIsTyping(true);

      if (isFinal) {
        setListening(false);
        setIsTyping(false);
        onSearch?.(text.trim());
        onSubmit?.(text.trim());
        inputRef.current?.focus();
      }
    };

    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);

    return () => {
      try { rec.abort(); } catch {}
      recognitionRef.current = null;
    };
  }, [onSearch, onSubmit]);

  const submit = () => {
    const v = q.trim();
    if (!v) return;
    onSubmit?.(v);
  };

  const clear = () => {
    setQ("");
    inputRef.current?.focus();
    onSearch?.("");
  };

  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Voice search isn’t supported in this browser. Try Chrome or Edge.");
      return;
    }
    try {
      if (!listening) { setListening(true); rec.start(); }
      else { setListening(false); rec.stop(); }
    } catch {
      setListening(false);
      try { rec.stop(); } catch {}
    }
  };

  return (
    <div
      className={`sticky top-14 md:top-16 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 ${className}`}
      role="search"
      aria-label="Campus search"
    >
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="group flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 pl-3 pr-1 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-300">
          <svg className="h-5 w-5 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setIsTyping(true); }}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder='Search buildings, “Dining Hall”, “Parking near A Block”…'
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
            aria-label="Search campus"
            autoComplete="off"
          />

          {q && (
            <button onClick={clear} className="rounded-full p-1.5 hover:bg-slate-100" aria-label="Clear search">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          <button
            onClick={toggleMic}
            className={`ml-auto rounded-full p-1.5 hover:bg-slate-100 ${listening ? "ring-2 ring-blue-500/60" : ""}`}
            aria-label={listening ? "Stop voice search" : "Start voice search"}
            title="Voice search"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill={listening ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </button>

          <button onClick={onScan} className="rounded-full p-1.5 hover:bg-slate-100" aria-label="Open scanner" title="Scan room/building QR">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm14 0h2v6h-6v-2h4v-4z" />
            </svg>
          </button>

          {isTyping && (
            <span className="ml-1 text-xs text-slate-500" aria-live="polite">
              {listening ? "listening…" : "searching…"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- QR Scan Modal ---------- */
function ScanModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    if (!videoRef.current) return; // satisfy strict null checks

    let stopped = false;

    (async () => {
      try {
        const { BrowserMultiFormatReader } = await import("@zxing/browser");
        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCam =
          devices.find((d) => /back|rear|environment/i.test(`${d.label}`))?.deviceId ??
          devices[0]?.deviceId ??
          undefined;

        const controls = await reader.decodeFromVideoDevice(
          backCam,
          videoRef.current!, // non-null assertion is safe due to guard above
          (result) => {
            if (stopped || !result) return;
            stopped = true;

            try { controlsRef.current?.stop(); } catch {}

            const text = result.getText();
            if (/^https?:\/\//i.test(text)) {
              window.location.href = text;
            } else {
              router.push(`/maps?code=${encodeURIComponent(text)}`);
            }
            onClose();
          }
        );

        controlsRef.current = controls;
      } catch (e) {
        setError((e as Error).message || "Could not access camera. Use HTTPS and allow permission.");
      }
    })();

    return () => {
      try { controlsRef.current?.stop(); } catch {}
    };
  }, [open, onClose, router]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Scan a campus QR</h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-slate-100">✕</button>
        </div>
        {error ? (
          <div className="text-sm text-red-600">
            {error}
            <ul className="mt-2 list-disc pl-5 text-slate-600">
              <li>Open the site over <b>https://</b> (or localhost)</li>
              <li>Allow camera permission in your browser</li>
              <li>Try switching to your back camera</li>
            </ul>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="w-full rounded-lg bg-black aspect-[3/4]" autoPlay muted playsInline />
            <p className="text-xs text-slate-500 mt-2">Point your camera at a campus QR code.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Cards ---------- */
type Card = {
  key: string;
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
  hours?: Hours;
  stallsCount?: number;
  description?: string;
};

const CARDS: readonly Card[] = [
  { key: "HQ",         title: "Student HQ",         href: "/sHQ",          icon: FaInfoCircle, hint: "Help desk & services",
    hours: { open: "08:00", close: "17:00" }, description: "ID cards, enrolment support, fees & forms." },
  { key: "mph",        title: "Multi Purpose Hall", href: "/smph",         icon: FaBuilding,   hint: "Events & assemblies",
    hours: { open: "07:00", close: "23:00" }, description: "Venue bookings, exams, large events." },
  { key: "dining",     title: "Dining",             href: "/dining",       icon: FaUtensils,   hint: "Open now near you",
    hours: { open: "07:00", close: "17:00" }, stallsCount: 12,
    description: "Ground floor (chicken rice, noodles)" },
  { key: "maps",       title: "Maps",               href: "/navigate/map", icon: FaMapMarkedAlt, hint: "Map & 360 tours",
    description: "Interactive map with blue dots and 360° panoramas." },
  { key: "studenthub", title: "Student Hub",        href: "/shub",         icon: FaUsers,      hint: "Clubs & hangout space",
    hours: { open: "07:00", close: "22:00" }, description: "Clubs, lounge areas, activity sign-ups." },
  { key: "study",      title: "Study Spaces",       href: "/study",        icon: FaBook,       hint: "Quiet / group rooms",
    hours: { open: "00:00", close: "24:00" }, description: "Junction, charging area, discussion room." },
  { key: "library",    title: "Library",            href: "/library",      icon: FaBookOpen,   hint: "Resources & study zones",
    hours: { open: "08:00", close: "21:30" }, description: "Quiet zone, self-checkout, opening hours." },
  { key: "parking",    title: "Parking",            href: "/parking",      icon: FaParking,    hint: "Closest lots",
    hours: { open: "00:00", close: "24:00" }, description: "Multi level car parks available." },
];

function TileCard({ card, active }: { card: Card; active: boolean }) {
  const open   = isOpenNow(card.hours);
  const [expanded, setExpanded] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" && !expanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <article
      tabIndex={0}
      aria-expanded={expanded}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onPointerDown={onPointerDown}
      onBlur={(e) => {
        const rt = e.relatedTarget as Node | null;
        if (!rt || !e.currentTarget.contains(rt)) setExpanded(false);
      }}
      className={[
        "group relative overflow-hidden",
        "rounded-[10px] bg-white shadow-[0_6px_12px_rgba(0,0,0,0.05)]",
        "transition-[max-height,box-shadow] duration-200 ease-in-out",
        "max-h-[140px] hover:max-h-[240px] focus-within:max-h-[240px]",
        active ? "ring-2 ring-[#C8102E]/30" : "",
      ].join(" ")}
    >
      <Link
        href={card.href}
        className="flex min-h-[140px] flex-col items-start justify-center gap-2 p-4 rounded-[10px] outline-none"
      >
        <div className="inline-flex items-center justify-center rounded-[12px] px-2.5 py-2 bg-[#C8102E]/10">
          <card.icon className="w-5 h-5 text-[#C8102E]" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-slate-900 leading-tight">{card.title}</p>
          <p className="text-[13px] text-slate-600 leading-snug">{card.hint}</p>
        </div>
      </Link>

      <div
        className={[
          "px-4 pb-4 -mt-1 overflow-hidden transition-all duration-200 ease-out",
          expanded ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="rounded-[14px] border border-slate-200 bg-white p-3 text-sm text-slate-700">
          {typeof open === "boolean" && (
            <div className="mb-1.5 flex items-center gap-2">
              <span
                role="img"
                aria-label={open ? "Open now" : "Closed now"}
                className={`inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-500" : "bg-slate-400"}`}
              />
              <span className="font-medium">{open ? "Open now" : "Closed now"}</span>
              {card.hours && <span className="text-slate-500">({card.hours.open}–{card.hours.close})</span>}
            </div>
          )}
          {typeof card.stallsCount === "number" && (
            <div className="mb-1.5"><span className="font-medium">Stalls:</span> {card.stallsCount}</div>
          )}
          {card.description && <div className="line-clamp-3">{card.description}</div>}
        </div>
      </div>
    </article>
  );
}

/* ---------- Images strip ---------- */
function CampusImages() {
  return (
    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
        <Image src="/images/courtyard.jpeg" alt="Swinburne courtyard" fill className="object-cover" priority />
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
        <Image src="/images/campus-map.jpeg" alt="Campus map" fill className="object-cover" />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function NavigatePage() {
  const [q, setQ] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const router = useRouter();

  const activeKey = useMemo(() => {
    const t = q.toLowerCase().trim();
    if (!t) return "";
    if (t.includes("park")) return "parking";
    if (t.includes("din") || t.includes("food")) return "dining";
    if (t.includes("study") || t.includes("room")) return "study";
    if (t.includes("map") || t.includes("360") || t.includes("route")) return "maps";
    if (t.includes("library") || t.includes("book")) return "library";
    if (t.includes("hq") || t.includes("student hq") || t.includes("help") || t.includes("info")) return "HQ";
    if (t.includes("hall") || t.includes("mph") || t.includes("multi purpose")) return "mph";
    if (t.includes("hub") || t.includes("student hub") || t.includes("club") || t.includes("hangout")) return "studenthub";
    return "";
  }, [q]);

  return (
    <SubpageLayout
      icon={<span>🧭</span>}
      title="Campus Navigation"
      description="Find places and services across campus."
    >
      <div className="col-span-full">
        <SearchBar
          onSearch={setQ}
          onSubmit={() => {
            if (activeKey) {
              const href = CARDS.find((c) => c.key === activeKey)!.href;
              router.push(href);
            }
          }}
          onScan={() => setScanOpen(true)}
          className="mb-6"
        />
      </div>

      <CampusImages />

      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CARDS.map((c) => (
          <TileCard key={c.key} card={c} active={c.key === activeKey} />
        ))}
      </div>

      <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
    </SubpageLayout>
  );
}
