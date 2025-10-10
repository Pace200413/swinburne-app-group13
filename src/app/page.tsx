"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import FeatureBanner from "@/components/FeatureBanner";
import SearchBar from "@/components/SearchBar";
import PinnedShortcuts from "@/components/PinnedShortcuts";
import ServiceStatusBar from "@/components/ServiceStatusBar";
import TileCard from "@/components/TileCard";
import type { EventItem } from "@/components/MiniEvents";

const MiniEvents = dynamic(() => import("@/components/MiniEvents"), {
  loading: () => <div className="h-24 rounded-xl bg-slate-100 animate-pulse" />,
  ssr: true,
});
const ChatLauncher = dynamic(() => import("@/components/ChatLauncher"), { ssr: false });

import {
  PhoneIcon,
  ShieldIcon,
  CompassIcon,
  MapPinIcon,
  ChatIcon,
  CalendarIcon,
  BookIcon,
} from "@/components/icons";

/* ---------- Dev-only: subtle staff access ---------- */
const IS_STAFF_LINK = process.env.NODE_ENV !== "production";

/* ---------- Data ---------- */
const EVENTS: EventItem[] = [
  { date: "10 Feb", title: "Orientation: 7 things before starting", location: "A002 Lecture Hall" },
  { date: "5 Mar", title: "AI Student Meetup", location: "Innovation Hub" },
];

const LINKS = {
  canvasImg: "/images/canvas-logo.png",
  portalImg: "/images/swinburne-student_portal.png",
  canvasHref: "https://www.swinburne.edu.my/canvas/",
  portalHref:
    "https://login.microsoftonline.com/3f639a9b-27c8-4403-82b1-ebfb88052d15/wsfed?wa=wsignin1.0&wtrealm=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&wctx=rm%3d0%26id%3dpassive%26ru%3dsecure%2fstudent%2fstuportal.aspx&wreply=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&AppType=Portal&Role=STUDENT",
};

/* ---------- Small helpers (no new files) ---------- */
type SectionProps = { id?: string; title: string; children: ReactNode };
const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="maxw container-px mt-8 scroll-mt-24">
    <h3 className="mb-3 text-base font-semibold">{title}</h3>
    {children}
  </section>
);

// Presents square logos nicely inside rounded TileCard avatars
const IconBadge = ({ src, alt }: { src: string; alt: string }) => (
  <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-slate-200/70 shadow-sm">
    <Image src={src} alt={alt} width={20} height={20} className="h-5 w-5 object-contain" />
  </span>
);

const GRID = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4";

export default function Page() {
  // Keyboard shortcuts: "/" focuses search; "g" then key jumps to sections (and admin in dev)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.defaultPrevented || tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "/") {
        const input = document.querySelector(
          'input[type="search"], input[role="searchbox"]'
        ) as HTMLInputElement | null;
        if (input) {
          e.preventDefault();
          input.focus();
        }
      }

      if (e.key.toLowerCase() === "g") {
        const once = (ev: KeyboardEvent) => {
          const map: Record<string, string> = {
            e: "#events",
            s: "#support-events",
            n: "#navigation",
            a: "#academics",
            d: "/admin", // dev-only direct jump
          };
          const target = map[ev.key.toLowerCase()];
          if (!target) return;

          if (target.startsWith("#")) {
            document
              .querySelector(target)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (IS_STAFF_LINK) {
            window.location.assign(target);
          }
        };
        window.addEventListener("keydown", once, { once: true, capture: true });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen selection:bg-slate-900/90 selection:text-white">
      {/* Global header comes from layout.tsx */}

      {/* Hero */}
      <FeatureBanner />

      {/* Search */}
      <section className="maxw container-px mt-4">
        <SearchBar />
      </section>

      {/* Utility row */}
      <PinnedShortcuts />
      <ServiceStatusBar />

      {/* Upcoming events */}
      <Section id="events" title="Upcoming events">
        <div className="min-h-[96px]">
          <MiniEvents items={EVENTS} limit={2} showHeading={false} showSeeAll={false} />
        </div>
      </Section>

      {/* Student Tools */}
      <Section id="student-tools" title="Student Tools">
        <div className={GRID}>
          <TileCard
            href={LINKS.canvasHref}
            title="Canvas"
            icon={
              <Image
                src={LINKS.canvasImg}
                alt="Canvas"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            }
            iconVariant="image"
            external
          />

          <TileCard
            href={LINKS.portalHref}
            title="Student Portal"
            icon={
              <Image
                src={LINKS.portalImg}
                alt="Student Portal"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            }
            iconVariant="image"
            external
          />
        </div>
      </Section>

      {/* Emergency & Safety */}
      <Section id="emergency" title="Emergency & Safety">
        <div className={GRID}>
          <TileCard href="/emergency" title="Security Contact" icon={<PhoneIcon />} tone="red" />
          <TileCard href="/safety" title="Staying Safe" icon={<ShieldIcon />} tone="red" />
        </div>
      </Section>

      {/* Campus Navigation */}
      <Section id="navigation" title="Campus Navigation">
        <div className={GRID}>
          <TileCard href="/navigate" title="Navigate" icon={<CompassIcon />} tone="black" />
          <TileCard href="/maps" title="Maps" icon={<MapPinIcon />} tone="black" />
        </div>
      </Section>

      {/* Support & Events */}
      <Section id="support-events" title="Support & Events">
        <div className={GRID}>
          <TileCard href="/support" title="Live Support" icon={<ChatIcon />} />
          <TileCard href="/events" title="Events" icon={<CalendarIcon />} />
        </div>
      </Section>

      {/* Academics */}
      <Section id="academics" title="Academics">
        <div className={GRID}>
          <TileCard href="/timetable" title="Timetable" icon={<CalendarIcon />} />
          <TileCard href="/library" title="Library" icon={<BookIcon />} />
        </div>
      </Section>

        <footer className="maxw container-px my-12 text-xs text-slate-500">
          © Swinburne 2025 · Privacy · We respectfully acknowledge the Wurundjeri People…
          {IS_STAFF_LINK && (
            <Link
              href="/admin"
              className="ml-3 underline decoration-dotted hover:text-slate-600"
              aria-label="Staff console"
            >
              Staff console
            </Link>
          )}
        </footer>

      <ChatLauncher />
    </div>
  );
}
