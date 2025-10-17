"use client";
import { useEffect, useState } from "react";

type Role = "Student" | "Staff" | "Visitor";
const ROLES: Role[] = ["Student", "Staff", "Visitor"];

export default function RoleSwitcher({ onChange }: { onChange: (r: Role)=>void }) {
  const [role, setRole] = useState<Role>(() => (localStorage.getItem("role") as Role) || "Student");

  useEffect(() => { localStorage.setItem("role", role); onChange(role); }, [role, onChange]);

  return (
    <div className="mb-4 flex gap-2">
      {ROLES.map(r => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            role === r ? "border-[#D42A30] text-[#D42A30]" : "border-slate-300 text-slate-600"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
