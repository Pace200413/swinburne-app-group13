// src/app/admin/layout.tsx  (or your (console)/layout.tsx)
import AdminShell from "../_shell";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import ForceLight from "@/components/admin/ForceLight";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <ForceLight />
      <div className="min-h-[100dvh] pb-[calc(64px+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <AdminBottomNav />
    </AdminShell>
  );
}
