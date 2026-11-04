import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { reviewCards } from "@/lib/sample-data";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Daily review — Novella" },
      { name: "description", content: "Review the words you saved while reading, just before you forget them." },
      { property: "og:title", content: "Daily review — Novella" },
      { property: "og:description", content: "Review the words you saved while reading, just before you forget them." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Review,
});

function Review() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const done = i >= reviewCards.length;
  const c = reviewCards[i];
  const next = () => { setShown(false); setI(i + 1); };

  return (
    <AppShell>
      <PageTitle kicker={done ? "Review complete" : `Card ${i + 1} of ${reviewCards.length}`}>
        {done ? <>That's today. <span className="marker">See you tomorrow.</span></> : "Do you remember this?"}
      </PageTitle>
      {done ? (
        <Link to="/" className="kicker inline-flex min-h-11 items-center sticker-sm bg-highlight px-5 text-highlight-foreground">Back to today</Link>
      ) : (
        <div className="max-w-2xl">
          <div className="sticker p-10">
            <p className="kicker text-muted-foreground">{c.book} · p. {c.page}</p>
            <p className="mt-4 font-display text-6xl md:text-7xl">{c.word}</p>
            <p className="mt-1 font-mono text-sm text-muted-foreground">{c.ipa}</p>
            {shown && (
              <div className="mt-8 border-t border-rule pt-6">
                <p className="text-xl">{c.meaning}</p>
                <p className="mt-3 italic text-muted-foreground">“{c.example}”</p>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {!shown ? (
              <button onClick={() => setShown(true)} className="kicker min-h-11 sticker-sm bg-primary px-6 text-primary-foreground">Show meaning</button>
            ) : (
              <>
                <button onClick={next} className="kicker min-h-11 sticker-sm bg-card px-6">Again · tomorrow</button>
                <button onClick={next} className="kicker min-h-11 sticker-sm bg-card px-6">Hard · 3 days</button>
                <button onClick={next} className="kicker min-h-11 sticker-sm bg-highlight px-6 text-highlight-foreground">Knew it · 2 weeks</button>
              </>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
