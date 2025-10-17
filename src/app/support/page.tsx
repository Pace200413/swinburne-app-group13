"use client";

import { useState } from "react";
import ServiceStatusBar from "@/components/ServiceStatusBar";
import SupportRequestForm from "@/components/SupportRequestForm";
import SupportDirectory from "@/components/SupportDirectory";
import SupportFAQ from "@/components/SupportFAQ";
import EmergencyBanner from "@/components/EmergencyBanner";
import QuickHelp from "@/components/QuickHelp";
import EmergencyFAB from "@/components/EmergencyFAB";
import { SERVICES } from "@/app/data/support-services";

export default function SupportPage() {
  const [filter, setFilter] = useState<{ cat?: string; q?: string }>({});

  return (
    <main className="maxw container-px my-6 space-y-6" aria-labelledby="support-title">
      <h1 id="support-title" className="text-xl font-semibold">Support Services</h1>

      <EmergencyBanner phone="+60 82 xxxx xxx" />
      <ServiceStatusBar />

      <QuickHelp
        onSelect={(v) => setFilter(v)}
        className="rounded-2xl border border-slate-200 bg-white p-4"
      />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="mb-2 text-sm font-semibold">Find a service</h2>
            <SupportDirectory services={SERVICES} preset={filter} />
          </div>
          <SupportFAQ />
        </div>

        <aside className="space-y-4" aria-label="Contact and after-hours">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold">Emergency</h3>
            <p className="text-sm text-slate-700">
              On-campus emergencies:{" "}
              <a href="tel:+6082xxxxxxx" className="underline font-medium">+60 82 xxxx xxx</a> (Security, 24/7).
            </p>
          </div>
          <SupportRequestForm />
        </aside>
      </section>

      <EmergencyFAB phone="+60 82 xxxx xxx" />
    </main>
  );
}
