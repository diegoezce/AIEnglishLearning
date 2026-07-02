import Link from "next/link";
import { BookOpen, FileText, CheckSquare, PenLine, Link2, ArrowUpDown, Bot, Zap } from "lucide-react";
import { DEMO_LESSON } from "@/lib/seed-lesson";

const EXERCISE_ICONS = [
  { icon: BookOpen, label: "Vocabulary" },
  { icon: FileText, label: "Reading" },
  { icon: CheckSquare, label: "Multiple choice" },
  { icon: PenLine, label: "Fill in the blanks" },
  { icon: Link2, label: "Matching pairs" },
  { icon: ArrowUpDown, label: "Drag & drop" },
  { icon: Bot, label: "AI Challenge" },
];

export default function Home() {
  const totalXp = DEMO_LESSON.exercises.reduce((s, e) => s + e.xp_value, 0) + DEMO_LESSON.xp_reward;

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: "var(--blest-cream)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight" style={{ color: "var(--blest-ink)" }}>
            Blest Learning
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest"
            style={{ backgroundColor: "var(--blest-olive-soft)", color: "var(--blest-olive-ink)" }}
          >
            Beta
          </span>
        </div>
        <Link
          href="/lesson/demo"
          className="text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
        >
          Try free lesson
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-5xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
              style={{ borderColor: "var(--blest-olive)", color: "var(--blest-olive-ink)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--blest-olive)" }} />
              AI + Business English
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
              style={{ color: "var(--blest-ink)", fontFamily: "var(--font-newsreader)" }}
            >
              Learn AI{" "}
              <span className="italic" style={{ color: "var(--blest-olive)" }}>
                in English.
              </span>
              <br />
              Use it at work.
            </h1>

            <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--blest-ink-soft)" }}>
              5-minute lessons that teach you how to use AI tools confidently — all in Business English.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/lesson/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
              >
                Start free lesson →
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {[
                { val: "5 min", label: "per lesson" },
                { val: `${totalXp} XP`, label: "to earn" },
                { val: "7", label: "exercises" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold" style={{ color: "var(--blest-ink)" }}>{stat.val}</p>
                  <p className="text-xs uppercase tracking-wide" style={{ color: "var(--blest-ink-soft)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson preview card */}
          <div
            className="rounded-3xl p-6 space-y-5"
            style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest opacity-50">Featured lesson</span>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "var(--blest-olive)", color: "white" }}
              >
                Free
              </span>
            </div>

            <div>
              <p className="text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-newsreader)" }}>
                {DEMO_LESSON.title}
              </p>
              <p className="text-sm mt-2 opacity-60">{DEMO_LESSON.description}</p>
            </div>

            <div className="space-y-2">
              {EXERCISE_ICONS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm opacity-80">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(246,244,238,0.1)" }}
                  >
                    <Icon size={14} />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            <Link
              href="/lesson/demo"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--blest-olive)", color: "white" }}
            >
              <Zap size={14} className="fill-current" />
              Start lesson
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
