import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/app-shell";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/settings")({
  head: () => pageHead("Settings", "Your account, reading preferences and plan."),
  component: SettingsPage,
});

function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="kicker text-muted-foreground">{label}</label>
      <input id={id} {...rest} className="mt-2 min-h-11 w-full sticker-sm bg-card px-3 outline-none" />
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell>
      <PageTitle kicker="Account">Settings</PageTitle>
      <div className="grid max-w-4xl gap-6 lg:grid-cols-2">
        <section className="sticker space-y-4 p-6">
          <h2 className="font-display text-3xl">Profile</h2>
          <Field id="name" label="Name" defaultValue="Rhishav" />
          <Field id="email" label="Email" type="email" defaultValue="rhishav@example.com" />
        </section>
        <section className="sticker space-y-4 p-6">
          <h2 className="font-display text-3xl">Reading</h2>
          <Field id="daily" label="Daily review cards" type="number" defaultValue={20} />
          <div>
            <label htmlFor="lang" className="kicker text-muted-foreground">Interface language</label>
            <select id="lang" className="mt-2 min-h-11 w-full sticker-sm bg-card px-3">
              <option>English</option><option>नेपाली</option>
            </select>
          </div>
        </section>
        <section className="sticker p-6 lg:col-span-2">
          <h2 className="font-display text-3xl">Plan</h2>
          <p className="mt-2 text-muted-foreground">You're on <span className="marker">Free</span>. Plus gives unlimited reviews, auto-fill, export and Ask your library — Rs 299/month.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="kicker min-h-11 sticker-sm bg-highlight px-5 text-highlight-foreground">Upgrade to Plus</button>
            <button className="kicker min-h-11 sticker-sm bg-card px-5">Sign out</button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
