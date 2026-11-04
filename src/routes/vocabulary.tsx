import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { reviewCards } from "@/lib/sample-data";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/vocabulary")({
  head: () => pageHead("Vocabulary", "Every word you saved while reading, with meaning and source."),
  component: Vocabulary,
});

function Vocabulary() {
  const [q, setQ] = useState("");
  const list = reviewCards.filter((c) => c.word.toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell>
      <PageTitle kicker={`${reviewCards.length} words saved`}>Your <span className="marker">vocabulary</span></PageTitle>
      <label htmlFor="vq" className="kicker text-muted-foreground">Filter words</label>
      <input id="vq" value={q} onChange={(e) => setQ(e.target.value)} className="mb-8 mt-2 min-h-11 w-full max-w-sm sticker-sm bg-card px-3 font-mono text-sm outline-none" />
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((c) => (
          <article key={c.word} className="sticker p-6">
            <p className="font-display text-4xl">{c.word}</p>
            <p className="font-mono text-sm text-muted-foreground">{c.ipa}</p>
            <p className="mt-4 text-lg">{c.meaning}</p>
            <p className="mt-2 italic text-muted-foreground">“{c.example}”</p>
            <p className="kicker mt-4 text-muted-foreground">{c.book} · p. {c.page}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
