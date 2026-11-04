import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/app-shell";
import { books } from "@/lib/sample-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Novella" },
      { name: "description", content: "Every book you're reading, with saved words, quotes and progress." },
      { property: "og:title", content: "Library — Novella" },
      { property: "og:description", content: "Every book you're reading, with saved words, quotes and progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Library,
});

function Library() {
  return (
    <AppShell>
      <PageTitle kicker={`${books.length} books`}>Your <span className="marker">library</span></PageTitle>
      <div className="sticker overflow-x-auto">
        <table className="w-full text-left">
          <thead className="kicker border-b border-border bg-paper-2">
            <tr>
              <th className="p-4">Book</th><th className="p-4">Progress</th><th className="p-4">Words</th><th className="p-4">Quotes</th><th className="p-4">Goal</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => {
              const pct = Math.round((b.page / b.pages) * 100);
              return (
                <tr key={b.id} className="border-b border-rule last:border-0 hover:bg-muted">
                  <td className="p-4"><Link to="/library/$bookId" params={{ bookId: b.id }} className="font-display text-xl underline-offset-4 hover:underline">{b.title}</Link><p className="text-sm text-muted-foreground">{b.author}</p></td>
                  <td className="p-4 font-mono text-sm">{pct === 100 ? <span className="marker">Finished</span> : `${pct}%`}</td>
                  <td className="p-4 font-mono text-sm">{b.words}</td>
                  <td className="p-4 font-mono text-sm">{b.quotes}</td>
                  <td className="kicker p-4 text-muted-foreground">{b.due ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
