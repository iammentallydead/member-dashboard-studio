import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { books, quotes, reviewCards } from "@/lib/sample-data";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/library_/$bookId")({
  loader: ({ params }) => {
    const book = books.find((b) => b.id === params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.book.title, `Your words, quotes and notes from ${loaderData.book.title}.`)
      : { meta: [{ title: "Book not found — Novella" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <AppShell>
      <PageTitle kicker="Library">Book not found</PageTitle>
      <Link to="/library" className="kicker underline">Back to library</Link>
    </AppShell>
  ),
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useLoaderData();
  const pct = Math.round((book.page / book.pages) * 100);
  const words = reviewCards.filter((c) => c.book === book.title);
  const bookQuotes = quotes.filter((q) => q.book === book.title);
  return (
    <AppShell>
      <Link to="/library" className="kicker mb-6 inline-flex min-h-11 items-center gap-2"><ArrowLeft className="size-4" /> Library</Link>
      <PageTitle kicker={book.author}>{book.title}</PageTitle>
      <div className="grid gap-4 sm:grid-cols-4">
        {[["Progress", `${pct}%`], ["Page", `${book.page}/${book.pages}`], ["Words", book.words], ["Quotes", book.quotes]].map(([k, v]) => (
          <div key={k} className="sticker p-5"><p className="kicker text-muted-foreground">{k}</p><p className="mt-1 font-display text-4xl">{v}</p></div>
        ))}
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-3xl">Words</h2>
          {words.length ? words.map((w) => (
            <div key={w.word} className="border-b border-rule py-3"><p className="font-display text-2xl">{w.word}</p><p className="text-sm text-muted-foreground">{w.meaning}</p></div>
          )) : <p className="text-muted-foreground">No words saved yet.</p>}
          <h2 className="mb-4 mt-10 font-display text-3xl">Quotes</h2>
          {bookQuotes.length ? bookQuotes.map((q) => (
            <blockquote key={q.text} className="mb-4 border-l-2 border-border bg-paper-2 p-4 text-lg"><span className="marker">{q.text}</span><p className="kicker mt-2 text-muted-foreground">p. {q.page}</p></blockquote>
          )) : <p className="text-muted-foreground">No quotes saved yet.</p>}
        </section>
        <section>
          <h2 className="mb-4 font-display text-3xl">Notes</h2>
          <label htmlFor="notes" className="kicker text-muted-foreground">Your notebook for this book</label>
          <textarea id="notes" rows={12} placeholder="Write in your own words…" className="mt-2 w-full sticker p-4 text-lg outline-none" />
        </section>
      </div>
    </AppShell>
  );
}
