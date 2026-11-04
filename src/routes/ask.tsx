import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/ask")({
  head: () => pageHead("Ask your library", "Ask questions answered only from the notes, quotes and words you saved."),
  component: Ask,
});

type Msg = { role: "you" | "novella"; text: string; source?: string };

function Ask() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "you", text: "What did Kahneman say about familiar things?" },
    { role: "novella", text: "You marked: “Nothing is so alarming as the familiar made strange.”", source: "Thinking, Fast and Slow · p. 203" },
  ]);
  const [q, setQ] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setMsgs([...msgs, { role: "you", text: q }, { role: "novella", text: "Sample answer — answers will come from your saved notes once this is connected." }]);
    setQ("");
  };
  return (
    <AppShell>
      <PageTitle kicker="Answers only from what you saved">Ask your <span className="marker">library</span></PageTitle>
      <div className="max-w-3xl sticker p-6">
        <div className="space-y-5">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "you" ? "ml-auto max-w-[80%] rounded-sm bg-muted p-4" : "max-w-[85%] border-l-2 border-border pl-4"}>
              <p className="kicker mb-1 text-muted-foreground">{m.role}</p>
              <p className="text-lg">{m.text}</p>
              {m.source && <p className="kicker mt-2 text-muted-foreground">{m.source}</p>}
            </div>
          ))}
        </div>
        <form onSubmit={send} className="mt-6 flex gap-2 border-t border-rule pt-5">
          <label htmlFor="ask" className="sr-only">Your question</label>
          <input id="ask" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about your books…" className="min-h-11 flex-1 sticker-sm bg-card px-3 outline-none" />
          <button className="kicker min-h-11 sticker-sm bg-highlight px-5 text-highlight-foreground">Ask</button>
        </form>
      </div>
    </AppShell>
  );
}
