// components/TileCard.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type TileCardProps = {
  href: string;
  title: string;
  icon: ReactNode;
  tone?: "black" | "red" | "neutral";
  external?: boolean;
  // NEW:
  iconVariant?: "default" | "image"; // defaults to "default"
};

export default function TileCard({
  href,
  title,
  icon,
  tone = "neutral",
  external,
  iconVariant = "default",
}: TileCardProps) {
  const Wrapper = external ? "a" : Link;
  const wrapperProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

  // existing tile classes … keep yours
  const tile =
    "group block rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,.10)] transition";

  // OLD dark avatar; keep for SVG icons
  const darkAvatar =
    "inline-grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-white";

  // NEW for raster logos (png/webp): clean white badge
  const imageBadge =
    "inline-grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-slate-200/70 shadow-sm";

  return (
    
    <Wrapper className={tile} {...wrapperProps}>
      <div className="flex items-center gap-3">
        <span className={iconVariant === "image" ? imageBadge : darkAvatar}>{icon}</span>
        <div className="flex-1">
          <div className="text-base font-medium text-slate-900">{title}</div>
        </div>
        <span className="ml-auto text-slate-300 transition group-hover:text-slate-400">→</span>
      </div>
    </Wrapper>
  );
}
