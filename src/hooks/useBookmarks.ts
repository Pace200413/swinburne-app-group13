"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/** Client-only bookmark store backed by localStorage. */
export function useBookmarks() {
  const [ready, setReady] = useState(false);
  const [setStore, setSetStore] = useState<Set<string>>(new Set());

  // load on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("bookmarks") : null;
      if (raw) setSetStore(new Set(JSON.parse(raw) as string[]));
    } catch {}
    setReady(true);
  }, []);

  // persist
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("bookmarks", JSON.stringify([...setStore]));
    } catch {}
  }, [ready, setStore]);

  const isSaved = useCallback((id: string) => setStore.has(id), [setStore]);

  const toggle = useCallback((id: string) => {
    setSetStore(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  /** compatibility fields your code expects */
  const map = setStore;                 // Set<string>
  const ids = useMemo(() => [...setStore], [setStore]); // string[] with .length

  return { ready, isSaved, toggle, map, ids };
}

export default useBookmarks;
