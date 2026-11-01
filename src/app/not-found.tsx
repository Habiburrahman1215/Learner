import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-900 text-[15px] font-black">
        HR
      </div>
      <h1 className="mt-5 text-[64px] font-black leading-none tracking-tighter text-white/15">404</h1>
      <p className="mt-2 text-[16px] font-semibold">That page is not in the zone.</p>
      <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-ink-muted">
        The lesson, question or route you asked for does not exist. Nothing is lost — your progress is safe on this device.
      </p>
      <div className="mt-6 flex gap-2">
        <Link href="/dashboard" className="btn-primary !py-2.5 text-[13px]">Dashboard</Link>
        <Link href="/learn" className="btn-ghost !py-2.5 text-[13px]">Library</Link>
      </div>
    </div>
  );
}
