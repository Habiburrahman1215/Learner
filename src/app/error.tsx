"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaced in the console only — nothing is sent anywhere.
    console.error("HR Learning Zone error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-900 text-[15px] font-black">
        HR
      </div>
      <h1 className="mt-5 text-[20px] font-bold tracking-tight">Something broke on this screen</h1>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-ink-muted">
        Your saved progress was not affected. Try again — if it keeps happening, the dashboard is always safe to return to.
      </p>
      <div className="mt-6 flex gap-2">
        <button onClick={reset} className="btn-primary !py-2.5 text-[13px]">Try again</button>
        <Link href="/dashboard" className="btn-ghost !py-2.5 text-[13px]">Dashboard</Link>
      </div>
    </div>
  );
}
