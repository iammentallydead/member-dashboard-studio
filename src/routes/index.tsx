import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Plus, Quote, Target } from "lucide-react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { books, quotes, reviewCards, week } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Novella" },
      { name: "description", content: "Your reading notebook: today's review, streak, goals and library." },
      { property: "og:title", content: "Today — Novella" },
      { property: "og:description", content: "Your reading notebook: today's review, streak, goals and library." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const reading = books.filter((b) => b.page < b.pages);
  const max = Math.max(...week.map((w) => w.n));
  return (
    <AppShell>
      <PageTitle kicker="Wednesday, 4 November">
        Good evening. <span className="marker">{reviewCards.length} words</span> are waiting.
      </PageTitle>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="sticker bg-primary p-8 text-primary-foreground lg:col-span-2" aria-labelledby="review-h">
          <p className="kicker opacity-70">Daily review · about 3 minutes</p>
          <h2 id="review-h" className="mt-3 font-display text-4xl md:text-5xl">Come back to it before you forget it.</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {reviewCards.map((c) => (
              <span key={c.word} className="kicker rounded-sm border border-primary-foreground/30 px-3 py-2">{c.word}</span>
            ))}
          </div>
          <Link to="/review" className="kicker mt-8 inline-flex min-h-11 items-center gap-2 sticker-sm bg-highlight px-5 text-highlight-foreground">
            Start review <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="sticker p-6" aria-labelledby="streak-h">
          <p id="streak-h" className="kicker flex items-center gap-2 text-muted-foreground"><Flame className="size-4" /> Streak</p>
          <p className="mt-2 font-display text-7xl">12<span className="text-3xl"> days</span></p>
          <p className="kicker mt-6 text-muted-foreground">Pages this week</p>
          <div className="mt-3 flex h-28 items-end gap-2">
            {week.map((w, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className={`w-full rounded-sm border border-border ${i === 3 ? "bg-highlight" : "bg-muted"}`} style={{ height: `${(w.n / max) * 100}%` }} />
                <span className="kicker">{w.d}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-14" aria-labelledby="reading-h">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="reading-h" className="font-display text-4xl">Currently reading</h2>
          <Link to="/library" className="kicker underline-offset-4 hover:underline">All books</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {reading.slice(0, 4).map((b) => {
            const pct = Math.round((b.page / b.pages) * 100);
            const perDay = b.due ? Math.ceil((b.pages - b.page) / 10) : null;
            return (
              <article key={b.id} className="sticker p-5">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.author}</p>
                  </div>
                  <button aria-label={`Save to ${b.title}`} className="grid size-11 shrink-0 place-items-center sticker-sm hover:bg-highlight">
                    <Plus className="size-4" />
                  </button>
                </div>
                <div className="mt-4 h-2 rounded-full border border-border bg-muted">
                  <div className="h-full rounded-full bg-highlight" style={{ width: `${pct}%` }} />
                </div>
                <div className="kicker mt-3 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>p. {b.page} / {b.pages}</span>
                  {perDay ? <span className="flex items-center gap-1"><Target className="size-3" /> {perDay} pages/day · by {b.due}</span> : <span>No goal</span>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2" aria-labelledby="quotes-h">
        <h2 id="quotes-h" className="font-display text-4xl md:col-span-2">Recently marked</h2>
        {quotes.map((q) => (
          <figure key={q.text} className="border-l-2 border-border bg-paper-2 p-6">
            <Quote className="size-4 text-muted-foreground" />
            <blockquote className="mt-2 text-xl leading-relaxed"><span className="marker">{q.text}</span></blockquote>
            <figcaption className="kicker mt-3 text-muted-foreground">{q.book} · p. {q.page}</figcaption>
          </figure>
        ))}
      </section>
    </AppShell>
  );
}
