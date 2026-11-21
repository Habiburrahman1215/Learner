"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { lessonById, moduleById, subjectById } from "@/content";
import { useApp } from "@/lib/store";
import { LessonBlocks } from "@/components/LessonBlocks";
import { Bar, cn, Icon } from "@/components/ui";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const { learner, patch, toggleBookmark, addStudyMinutes, toast } = useApp();
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState(17);

  const lesson = lessonById[params.id];

  useEffect(() => {
    const saved = Number(window.localStorage.getItem("hlz.reading.font"));
    if (saved >= 16 && saved <= 22) setFontSize(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("hlz.reading.font", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [params.id]);

  const { next, prev, subject, mod } = useMemo(() => {
    if (!lesson) return { next: null, prev: null, subject: null, mod: null };
    const subject = subjectById[lesson.subject];
    const courseLessons = subject.modules.flatMap((m) => m.lessons);
    const idx = courseLessons.findIndex((l) => l.id === lesson.id);
    return {
      next: idx + 1 < courseLessons.length ? courseLessons[idx + 1] : null,
      prev: idx > 0 ? courseLessons[idx - 1] : null,
      subject,
      mod: moduleById[lesson.moduleId],
    };
  }, [lesson]);

  if (!lesson || !subject) {
    return (
      <div className="card p-6 text-center">
        <p className="text-[15px] font-semibold">Lesson not found</p>
        <Link href="/learn" className="btn-ghost mt-3 inline-flex">Back to library</Link>
      </div>
    );
  }

  const read = learner.readLessons.includes(lesson.id);
  const bookmarked = learner.bookmarks.includes(lesson.id);

  const markRead = () => {
    if (read) return;
    patch((s) => ({
      ...s,
      readLessons: [...s.readLessons, lesson.id],
      xp: s.xp + 12,
    }));
    addStudyMinutes(lesson.minutes);
    toast({ title: "+12 XP · lesson complete", body: lesson.title, tone: "success" });
  };

  return (
    <div>
      {/* reading progress */}
      <div className="fixed inset-x-0 top-14 z-20 h-0.5 bg-transparent">
        <div className="h-full bg-accent-lime transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Link href={`/learn/${subject.id}`} className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-muted hover:text-ink">
          <Icon name="arrowLeft" className="h-4 w-4" /> {subject.short}
        </Link>
        <span className="text-ink-faint">/</span>
        <span className="truncate text-[12.5px] text-ink-faint">{mod?.title}</span>
        <button
          onClick={() => toggleBookmark(lesson.id)}
          className={cn("ml-auto rounded-full p-1.5", bookmarked ? "text-accent-amber" : "text-ink-faint")}
          aria-label="Bookmark lesson"
        >
          <Icon name="star" className="h-4 w-4" />
        </button>
      </div>

      <header className="mb-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="brand-chip !py-0.5 !text-[10px]">{subject.short}</span>
          <span className="text-[12px] text-ink-muted">{lesson.minutes} min · {lesson.blocks.length} sections</span>
          {read && (
            <span className="accent-pill ml-auto">
              <Icon name="check" className="h-3 w-3" /> read
            </span>
          )}
        </div>
        <h1 className="max-w-[24ch] text-balance text-[28px] font-black leading-[1.15] tracking-tight">{lesson.title}</h1>
        {lesson.subtitle && <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{lesson.subtitle}</p>}
      </header>

      {lesson.blocks.some((b) => b.k === "h") && (
        <details className="card-flat mb-3 px-4 py-3">
          <summary className="cursor-pointer text-[14px] font-semibold text-ink">Lesson outline</summary>
          <nav aria-label="Lesson outline" className="mt-2 grid gap-1">
            {lesson.blocks.map((block, index) => block.k === "h" ? (
              <a key={index} href={`#lesson-section-${index}`} className="rounded-lg px-2 py-2 text-[13px] leading-snug text-ink-muted hover:bg-surface-3 hover:text-ink">
                {block.t}
              </a>
            ) : null)}
          </nav>
        </details>
      )}

      <div className="mb-3 flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-line bg-surface/70 px-3.5 py-2">
        <div>
          <div className="text-[13px] font-semibold">Reading settings</div>
          <div className="text-[11px] text-ink-muted">Adjust text size on this device</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => setFontSize((v) => Math.max(16, v - 1))} disabled={fontSize <= 16} className="grid h-10 w-10 place-items-center rounded-xl border border-line text-[15px] font-semibold disabled:opacity-40" aria-label="Decrease reading text size">A−</button>
          <span className="min-w-10 text-center text-[12px] tabular-nums text-ink-muted" aria-live="polite">{fontSize}px</span>
          <button type="button" onClick={() => setFontSize((v) => Math.min(22, v + 1))} disabled={fontSize >= 22} className="grid h-10 w-10 place-items-center rounded-xl border border-line text-[15px] font-semibold disabled:opacity-40" aria-label="Increase reading text size">A+</button>
        </div>
      </div>

      <article className="card px-5 py-6 sm:px-8 sm:py-8">
        <LessonBlocks blocks={lesson.blocks} fontSize={fontSize} />
      </article>

      <div className="mt-4 space-y-2">
        {!read ? (
          <button className="btn-primary w-full" onClick={markRead}>
            <Icon name="check" className="h-4 w-4" /> Mark as read (+12 XP)
          </button>
        ) : (
          <div className="card-flat flex items-center gap-2.5 px-4 py-3">
            <Icon name="check" className="h-4 w-4 text-accent-lime" />
            <span className="text-[13px] text-ink-muted">Lesson complete. Nice work.</span>
          </div>
        )}

        <Link
          href={`/practice?subject=${subject.id}&topic=${lesson.moduleId}&count=10`}
          className="btn-ghost w-full"
        >
          <Icon name="target" className="h-4 w-4" /> Practise this topic now
        </Link>
      </div>

      {lesson.topics.length > 0 && (
        <div className="mt-4">
          <div className="section-title mb-2">Covers</div>
          <div className="flex flex-wrap gap-1.5">
            {lesson.topics.map((t) => (
              <span key={t} className="rounded-full border border-line bg-surface-2/50 px-2.5 py-1 text-[11px] text-ink-muted">
                {t.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      <nav className="mt-6 grid gap-2 sm:grid-cols-2">
        {prev ? (
          <Link href={`/lesson/${prev.id}`} className="card-flat px-3.5 py-3">
            <div className="text-[10px] uppercase tracking-wider text-ink-faint">Previous</div>
            <div className="mt-0.5 line-clamp-2 text-[12.5px] font-medium">{prev.title}</div>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/lesson/${next.id}`} className="card-flat px-3.5 py-3 text-right">
            <div className="text-[10px] uppercase tracking-wider text-ink-faint">Next lesson</div>
            <div className="mt-0.5 line-clamp-2 text-[12.5px] font-medium">{next.title}</div>
          </Link>
        )}
      </nav>
    </div>
  );
}
