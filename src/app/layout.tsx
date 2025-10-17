// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav"; // public nav only
import AppearanceClient from "@/components/AppearanceClient";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Swinburne App — Group 13",
  description: "Campus navigation, events, and support for students & visitors.",
  applicationName: "Swinburne App (Group 13)",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh bg-white text-slate-900 font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('profile_theme')||localStorage.getItem('guest_theme')||'system';var d=(t==='dark')||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-white text-slate-900 px-3 py-2 rounded-md shadow"
        >
          Skip to content
        </a>

        <Header />

        <main id="content" className="maxw container-px py-6 pb-24 overscroll-y-contain">
          {children}
        </main>

        <BottomNav />  {/* public/nav shows on non-admin pages */}

        <AppearanceClient />
      </body>
    </html>
  );
}
