import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/app-shell";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/class")({
  head: () => pageHead("Class", "Assigned books and word lists, and the words your class finds hardest."),
  component: ClassPage,
});

const hardest = [["Obstinate", 72], ["Impertinent", 58], ["Heuristic", 41], ["Proverbial", 25]] as const;

function ClassPage() {
  return (
    <AppShell>
      <PageTitle kicker="In development">Class <span className="marker">10 B</span></PageTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="sticker p-6">
          <p className="kicker text-muted-foreground">Assigned</p>
          <h2 className="mt-2 font-display text-3xl">Pride and Prejudice</h2>
          <p className="text-muted-foreground">Chapters 1–12 · due 30 Nov · set by Ms. Shrestha</p>
          <p className="kicker mt-6 text-muted-foreground">Word list</p>
          <p className="mt-1">IELTS set 4 · 40 words</p>
        </section>
        <section className="sticker p-6">
          <p className="kicker text-muted-foreground">Hardest words for the class</p>
          <ul className="mt-4 space-y-4">
            {hardest.map(([w, n]) => (
              <li key={w}>
                <div className="flex justify-between"><span className="font-display text-2xl">{w}</span><span className="font-mono text-sm">{n}% missed</span></div>
                <div className="mt-1 h-2 rounded-full border border-border bg-muted"><div className="h-full rounded-full bg-highlight" style={{ width: `${n}%` }} /></div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
