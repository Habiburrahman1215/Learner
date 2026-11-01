"use client";

import type { Item } from "@/content/types";

/**
 * Generated items are ephemeral by design. When one is answered we keep a
 * bounded snapshot so the spaced-repetition queue can still find it later —
 * without bloating localStorage or the bundle.
 */

const KEY = "hlz.itemcache.v1";
const LIMIT = 500;

export function cacheItems(items: Item[]) {
  if (typeof window === "undefined" || !items.length) return;
  try {
    const raw = localStorage.getItem(KEY);
    const map: Record<string, Item> = raw ? JSON.parse(raw) : {};
    for (const it of items) map[it.id] = it;
    const entries = Object.entries(map);
    if (entries.length > LIMIT) {
      // keep the most recently written half
      const trimmed = Object.fromEntries(entries.slice(-LIMIT));
      localStorage.setItem(KEY, JSON.stringify(trimmed));
    } else {
      localStorage.setItem(KEY, JSON.stringify(map));
    }
  } catch {
    /* quota or private mode — non-fatal */
  }
}

export function getCachedItem(id: string): Item | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, Item>;
    return map[id] ?? null;
  } catch {
    return null;
  }
}

export function cachedItems(): Item[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (Object.values(JSON.parse(raw)) as Item[]) : [];
  } catch {
    return [];
  }
}
