"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Left & right clusters for the 4-tab layout.
const LEFT = [
  { href: "/",           label: "Home",      icon: "🏠" },
  { href: "/messages",   label: "Messages",  icon: "💬" },
] as const;

const RIGHT = [
  { href: "/favourites", label: "Favourites", icon: "⭐" },
  { href: "/menu",       label: "Menu",       icon: "▦" },
] as const;

// Center FAB opens this Services grid
const ACTIONS = [
  { href: "/navigate",    label: "Navigate",     icon: "🗺️" },
  { href: "/support",     label: "Support",      icon: "🛠️" },
  { href: "/emergency",   label: "Emergency",    icon: "🚨" },
  { href: "/orientation", label: "Orientation",  icon: "🎓" },
  { href: "/events",      label: "Events",       icon: "📅" },
  { href: "/profile",     label: "Profile",      icon: "👤" },
  { href: "/messages",    label: "Messages",     icon: "💬" },
  { href: "/favourites",  label: "Favourites",   icon: "⭐" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Don’t early-return; always call hooks. We’ll hide via CSS instead.
  const isAdminRoute = pathname.startsWith("/admin");

  // Lock page scroll when sheet is open (client-only effect).
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = open ? "hidden" : prev;
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        // Keep the className static to avoid hydration diffs; only toggle "hidden".
        className={`PublicBottomNav fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200
                    bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70
                    shadow-[0_-1px_0_rgba(2,6,23,.06),0_-8px_32px_rgba(2,6,23,.08)]
                    pb-[max(8px,env(safe-area-inset-bottom))] ${isAdminRoute ? "hidden" : ""}`}
        role="navigation"
        aria-label="Primary"
      >
        <div className="relative mx-auto flex h-16 max-w-screen-md items-center justify-between px-4">
          {/* left two */}
          <div className="flex gap-2 md:gap-3">
            {LEFT.map((it) => {
              const active = isActive(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative grid place-items-center rounded-xl px-3 py-1 text-sm transition
                    ${active
                      ? "text-[var(--brand)] font-semibold bg-[color-mix(in_oklab,var(--brand)_10%,transparent)]"
                      : "text-slate-700 hover:bg-slate-50"}`}
                >
                  <span aria-hidden className="text-[18px]">{it.icon}</span>
                  <span className="mt-0.5">{it.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[var(--brand)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* right two */}
          <div className="flex gap-2 md:gap-3">
            {RIGHT.map((it) => {
              const active = isActive(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative grid place-items-center rounded-xl px-3 py-1 text-sm transition
                    ${active
                      ? "text-[var(--brand)] font-semibold bg-[color-mix(in_oklab,var(--brand)_10%,transparent)]"
                      : "text-slate-700 hover:bg-slate-50"}`}
                >
                  <span aria-hidden className="text-[18px]">{it.icon}</span>
                  <span className="mt-0.5">{it.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[var(--brand)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* center FAB */}
          <button
            aria-label="Open services"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-5
                       grid h-16 w-16 place-items-center rounded-full
                       bg-[var(--brand)] text-white shadow-xl ring-4 ring-white
                       hover:scale-105 active:scale-95 transition"
          >
            <span className="text-2xl">💠</span>
          </button>
        </div>
      </nav>

      {/* Services sheet — bottom on mobile, centered on desktop */}
      {open && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
          <section
            className="absolute inset-x-0 bottom-0 max-h-[85%] rounded-t-3xl bg-white p-4 shadow-2xl
                       md:inset-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[80vh]
                       md:w-[720px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl"
            role="dialog" aria-modal="true" aria-label="Services"
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200 md:hidden" />
            <header className="mt-2 mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold">Services</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-sm underline">
                Close
              </button>
            </header>

            <div className="grid grid-cols-4 gap-3 md:grid-cols-6 overflow-auto pb-20 md:pb-0">
              {ACTIONS.map(a => (
                <Link
                  key={a.label}
                  href={a.href}
                  onClick={() => setOpen(false)}
                  className="grid place-items-center gap-1 rounded-xl border border-slate-200
                             bg-white px-3 py-3 text-center text-xs shadow-sm active:scale-[.99]"
                >
                  <span aria-hidden className="text-lg">{a.icon}</span>
                  <span className="leading-tight">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
