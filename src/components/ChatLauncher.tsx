"use client";
import { useState } from "react";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 rounded-full shadow-lg bg-black text-white px-4 py-3"
        aria-label="Open live chat"
      >
        💬 Live chat
      </button>

      {open && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/40" onClick={()=>setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-4" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Support chat</h3>
              <button onClick={()=>setOpen(false)} aria-label="Close">✕</button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Chat widget placeholder. Embed vendor script here (e.g. Intercom/Genesys) or your custom WebSocket chat.
            </p>
            <div className="mt-3 grid gap-2">
              <input className="rounded border px-3 py-2" placeholder="Your name" />
              <textarea className="rounded border px-3 py-2 min-h-[100px]" placeholder="How can we help?" />
              <button className="rounded bg-[#D42A30] text-white px-3 py-2">Start chat</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
