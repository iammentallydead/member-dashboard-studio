import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BookOpen, Flame, LayoutGrid, MessageSquare, Repeat, Search, Settings, Type, Users } from "lucide-react";

const nav = [
  { to: "/", label: "Today", icon: LayoutGrid, exact: true },
  { to: "/library", label: "Library", icon: BookOpen, exact: false },
  { to: "/review", label: "Review", icon: Repeat, exact: true },
  { to: "/vocabulary", label: "Vocabulary", icon: Type, exact: true },
  { to: "/ask", label: "Ask your library", icon: MessageSquare, exact: true },
  { to: "/class", label: "Class", icon: Users, exact: true },
  { to: "/settings", label: "Settings", icon: Settings, exact: true },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[15rem_1fr]">
      <a href="#main" className="kicker sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-highlight focus:p-2">
        Skip to content
      </a>
      <aside className="border-b border-border bg-paper-2 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-6 py-5 md:block">
          <Link to="/" className="font-display text-3xl leading-none">Novella</Link>
          <p className="kicker mt-1 hidden text-muted-foreground md:block">Reading notebook</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {nav.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              className="kicker flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-sm px-3 text-foreground hover:bg-muted"
              activeProps={{ className: "bg-highlight text-highlight-foreground" }}
            >
              <Icon className="size-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="mx-3 mt-8 hidden sticker p-4 md:block">
          <p className="kicker flex items-center gap-2"><Flame className="size-4" /> 12 day streak</p>
          <p className="mt-2 text-sm text-muted-foreground">1 freeze ready. Miss a day without starting over.</p>
        </div>
        <div className="absolute bottom-0 hidden w-60 border-t border-rule p-4 md:block">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full border border-border bg-highlight font-mono text-sm">R</div>
            <div className="min-w-0">
              <p className="truncate text-sm">Rhishav</p>
              <p className="kicker text-muted-foreground">Free plan</p>
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex items-center gap-3 border-b border-rule px-6 py-3 md:px-10">
          <Search className="size-4 text-muted-foreground" />
          <input
            aria-label="Search your library"
            placeholder="Search words, quotes, notes…"
            className="min-h-11 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
        </header>
        <main id="main" className="mx-auto max-w-6xl px-6 py-10 md:px-10">{children}</main>
      </div>
    </div>
  );
}

export function PageTitle({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <p className="kicker text-muted-foreground">{kicker}</p>
      <h1 className="mt-2 font-display text-5xl leading-[0.95] md:text-7xl">{children}</h1>
    </div>
  );
}
