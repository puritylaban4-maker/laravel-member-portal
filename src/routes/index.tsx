import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  HandCoins,
  Headphones,
  History,
  Home,
  Menu,
  MoreHorizontal,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useState, type ComponentType } from "react";

import logoAsset from "@/assets/khwwc-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Member Dashboard — KHWWC" },
      {
        name: "description",
        content: "Track KHWWC contributions, wallet activity, statements, and membership status.",
      },
      { property: "og:title", content: "Member Dashboard — KHWWC" },
      {
        property: "og:description",
        content: "A secure overview of your KHWWC membership and contributions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemberDashboard,
});

type IconType = ComponentType<{ className?: string }>;

const navItems: { label: string; icon: IconType }[] = [
  { label: "Overview", icon: Home },
  { label: "My wallet", icon: WalletCards },
  { label: "Contributions", icon: TrendingUp },
  { label: "Statements", icon: FileText },
];

const activity = [
  {
    icon: Check,
    iconClass: "bg-success/12 text-success",
    title: "Contribution received",
    detail: "Monthly contribution · Ref QHZ8X12345",
    amount: "+ KSh 300",
    date: "7 Sep · 10:24 AM",
  },
  {
    icon: Download,
    iconClass: "bg-secondary text-foreground",
    title: "Statement downloaded",
    detail: "Contribution statement",
    amount: "",
    date: "7 Sep · 8:12 AM",
  },
  {
    icon: UserRound,
    iconClass: "bg-warning/15 text-warning-foreground",
    title: "Beneficiary updated",
    detail: "Added dependant",
    amount: "",
    date: "4 Sep · 4:32 PM",
  },
  {
    icon: Clock3,
    iconClass: "bg-primary/12 text-primary",
    title: "STK payment initiated",
    detail: "KSh 300 · Ref KHWWC02456",
    amount: "Pending",
    date: "3 Sep · 11:15 AM",
  },
];

function MemberDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [message, setMessage] = useState("");

  const announce = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <DesktopRail activeNav={activeNav} setActiveNav={setActiveNav} />

        <div className="min-w-0 flex-1 pb-24 lg:pb-0">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1340px] items-center justify-between px-5 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3 lg:hidden">
                <img src={logoAsset.url} alt="KHWWC logo" className="size-11 rounded-full object-cover" />
                <div>
                  <p className="font-display text-sm font-bold">KHWWC</p>
                  <p className="text-[11px] text-muted-foreground">Member portal</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Member portal</p>
                <h1 className="font-display text-xl font-bold">Good afternoon, Laban</h1>
              </div>
              <div className="relative flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open notifications"
                  onClick={() => setNotificationsOpen((open) => !open)}
                  className="relative rounded-full border border-border bg-card"
                >
                  <Bell />
                  <span className="absolute right-1 top-1 size-2 rounded-full bg-primary ring-2 ring-card" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setProfileOpen((open) => !open)}
                  className="h-10 rounded-full border border-border bg-card px-2 sm:px-3"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-panel text-xs font-bold text-sidebar-foreground">LM</span>
                  <span className="hidden text-xs font-semibold sm:inline">Laban M.</span>
                  <ChevronDown className="hidden sm:block" />
                </Button>
                {notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} />}
                {profileOpen && (
                  <div className="absolute right-0 top-12 w-56 rounded-lg border border-border bg-popover p-2 shadow-xl">
                    <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">KHWWC-0241</p>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => announce("Profile selected")}>My profile</Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => announce("Support selected")}>Contact support</Button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1340px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
            <section className="mb-7 flex items-end justify-between gap-4 lg:hidden">
              <div>
                <p className="text-sm text-muted-foreground">Good afternoon</p>
                <h2 className="font-display text-2xl font-bold">Laban Maina</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                <span className="size-1.5 rounded-full bg-success" /> Active
              </span>
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,.55fr)]">
              <div className="overflow-hidden rounded-lg bg-panel-strong text-sidebar-foreground shadow-2xl shadow-foreground/10">
                <div className="grid min-h-72 gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
                  <div className="flex min-w-0 flex-col justify-between">
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-sidebar-foreground/70">
                          <WalletCards className="size-4 text-sidebar-primary" /> Member wallet
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={balanceVisible ? "Hide balance" : "Show balance"}
                          onClick={() => setBalanceVisible((visible) => !visible)}
                          className="rounded-full text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        >
                          {balanceVisible ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-sidebar-foreground/55">Total balance</p>
                      <p className="font-display text-4xl font-bold tabular-nums sm:text-5xl">
                        {balanceVisible ? "KSh 12,450" : "KSh ••••••"}
                        <span className="text-xl text-sidebar-foreground/55">.00</span>
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm text-sidebar-foreground/65">
                        <span>Available <strong className="text-sidebar-foreground">KSh 12,250</strong></span>
                        <span>Pending <strong className="text-sidebar-foreground">KSh 200</strong></span>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button onClick={() => announce("Payment flow ready to connect") } className="h-11 rounded-md bg-sidebar-primary px-5 text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
                        <HandCoins /> Make a payment
                      </Button>
                      <Button onClick={() => announce("Statement download ready to connect") } variant="ghost" className="h-11 rounded-md border border-sidebar-border px-5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground">
                        <ArrowDownToLine /> Statement
                      </Button>
                    </div>
                  </div>
                  <div className="hidden w-px bg-sidebar-border lg:block" />
                </div>
              </div>

              <aside className="rounded-lg border border-border bg-card p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Membership</p>
                    <p className="mt-1 font-display text-xl font-bold">Active member</p>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-full bg-success/10 text-success"><ShieldCheck className="size-5" /></span>
                </div>
                <div className="space-y-4 border-y border-border py-5 text-sm">
                  <InfoRow label="Member number" value="KHWWC-0241" />
                  <InfoRow label="Member since" value="September 2024" />
                  <InfoRow label="Months paid" value="12 months" />
                </div>
                <Button variant="ghost" className="mt-4 w-full justify-between px-0 hover:bg-transparent hover:text-primary" onClick={() => announce("Membership details selected") }>
                  View membership details <ArrowRight />
                </Button>
              </aside>
            </section>

            <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              <MetricCard icon={CircleDollarSign} tone="success" label="Contributions" value="KSh 7,800" note="KSh 300 this month" />
              <MetricCard icon={CalendarDays} tone="primary" label="Next due date" value="5 Oct 2026" note="Due in 8 days" />
              <MetricCard icon={ReceiptText} tone="warning" label="Penalty wallet" value="KSh 250" note="Available balance" />
              <MetricCard icon={CreditCard} tone="neutral" label="Monthly target" value="KSh 300" note="Standard contribution" />
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(330px,.65fr)]">
              <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">2026 contribution</p>
                    <h2 className="mt-1 font-display text-2xl font-bold">You’re right on track</h2>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold">81%</p>
                    <p className="text-xs text-muted-foreground">8 of 12 months</p>
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[81%] rounded-full bg-primary" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span><strong>KSh 7,800</strong> paid</span>
                  <span className="text-muted-foreground">Target KSh 9,600</span>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <ActionTile icon={HandCoins} title="Make a payment" detail="M-Pesa STK push" primary onClick={() => announce("Payment flow ready to connect")} />
                  <ActionTile icon={FileText} title="Get a statement" detail="Download or print" onClick={() => announce("Statement download ready to connect")} />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Payment cycle</p>
                    <h2 className="mt-1 font-display text-xl font-bold">Next contribution</h2>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><CalendarDays className="size-5" /></span>
                </div>
                <p className="font-display text-3xl font-bold">5 October</p>
                <p className="mt-1 text-sm text-muted-foreground">KSh 300 monthly contribution</p>
                <div className="mt-7 flex items-center gap-3 rounded-md bg-muted p-4">
                  <Clock3 className="size-5 text-primary" />
                  <p className="text-sm"><strong>8 days remaining</strong><br /><span className="text-xs text-muted-foreground">Pay on time to stay current</span></p>
                </div>
              </div>
            </section>

            <section className="mt-5 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Latest updates</p>
                  <h2 className="mt-1 font-display text-xl font-bold">Recent activity</h2>
                </div>
                <Button variant="ghost" className="text-primary" onClick={() => announce("Full activity selected")}>View all <ArrowRight /></Button>
              </div>
              <div className="divide-y divide-border px-5 sm:px-8">
                {activity.map((item) => (
                  <div key={item.title} className="grid grid-cols-[auto_1fr] gap-3 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4">
                    <span className={cn("flex size-10 items-center justify-center rounded-full", item.iconClass)}><item.icon className="size-4" /></span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{item.title}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <div className="col-start-2 flex items-center justify-between gap-4 text-xs sm:col-start-auto sm:block sm:text-right">
                      {item.amount && <p className={cn("font-semibold", item.amount.startsWith("+") ? "text-success" : "text-primary")}>{item.amount}</p>}
                      <p className="text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <MobileNav activeNav={activeNav} setActiveNav={setActiveNav} />
      {message && <div role="status" className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-xl lg:bottom-6">{message}</div>}
    </div>
  );
}

function DesktopRail({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (value: string) => void }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar px-4 py-6 text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-3 px-2">
        <img src={logoAsset.url} alt="KHWWC logo" className="size-12 rounded-full object-cover ring-1 ring-sidebar-border" />
        <div><p className="font-display font-bold">KHWWC</p><p className="text-[11px] text-sidebar-foreground/55">Care · Support · Unity</p></div>
      </div>
      <nav className="mt-12 space-y-1">
        {navItems.map((item) => (
          <Button key={item.label} variant="ghost" onClick={() => setActiveNav(item.label)} className={cn("h-11 w-full justify-start px-3 text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground", activeNav === item.label && "bg-sidebar-accent text-sidebar-foreground")}>
            <item.icon className={cn(activeNav === item.label && "text-sidebar-primary")} /> {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto rounded-lg border border-sidebar-border bg-sidebar-accent/60 p-4">
        <Headphones className="mb-3 size-5 text-sidebar-primary" />
        <p className="text-sm font-semibold">Need assistance?</p>
        <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/55">Our welfare support team is ready to help.</p>
        <Button variant="ghost" className="mt-3 h-auto p-0 text-xs text-sidebar-primary hover:bg-transparent hover:text-sidebar-primary">Contact support <ArrowRight /></Button>
      </div>
    </aside>
  );
}

function MobileNav({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (value: string) => void }) {
  const items = [...navItems.slice(0, 3), { label: "More", icon: Menu }];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sidebar-border bg-sidebar px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 text-sidebar-foreground shadow-2xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => (
          <Button key={item.label} variant="ghost" onClick={() => setActiveNav(item.label)} className={cn("h-14 flex-col gap-1 rounded-md px-1 text-[10px] text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-foreground", activeNav === item.label && "text-sidebar-primary")}>
            <item.icon className="size-5" /> {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}

function Notifications({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 top-12 w-[min(22rem,calc(100vw-2.5rem))] rounded-lg border border-border bg-popover p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between"><p className="font-display font-bold">Notifications</p><Button variant="ghost" size="icon" aria-label="Close notifications" onClick={onClose}><X /></Button></div>
      <div className="rounded-md bg-muted p-4"><p className="text-sm font-semibold">Contribution received</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Your KSh 300 payment was posted successfully.</p></div>
      <Button variant="ghost" className="mt-2 w-full justify-between text-xs">Notification history <ArrowRight /></Button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4"><span className="text-muted-foreground">{label}</span><strong className="text-right">{value}</strong></div>;
}

function MetricCard({ icon: Icon, tone, label, value, note }: { icon: IconType; tone: "success" | "primary" | "warning" | "neutral"; label: string; value: string; note: string }) {
  const toneClass = { success: "bg-success/10 text-success", primary: "bg-primary/10 text-primary", warning: "bg-warning/20 text-warning-foreground", neutral: "bg-secondary text-foreground" }[tone];
  return (
    <article className="min-w-0 rounded-lg border border-border bg-card p-4 sm:p-5">
      <span className={cn("mb-5 flex size-9 items-center justify-center rounded-md", toneClass)}><Icon className="size-4" /></span>
      <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold tabular-nums sm:text-xl">{value}</p>
      <p className="mt-1 truncate text-[11px] text-muted-foreground sm:text-xs">{note}</p>
    </article>
  );
}

function ActionTile({ icon: Icon, title, detail, primary = false, onClick }: { icon: IconType; title: string; detail: string; primary?: boolean; onClick: () => void }) {
  return (
    <Button variant={primary ? "default" : "outline"} onClick={onClick} className="h-auto min-h-20 justify-start rounded-md px-4 py-4 text-left">
      <span className={cn("flex size-10 items-center justify-center rounded-md", primary ? "bg-primary-foreground/15" : "bg-muted text-primary")}><Icon /></span>
      <span className="min-w-0"><span className="block font-semibold">{title}</span><span className={cn("mt-1 block text-xs font-normal", primary ? "text-primary-foreground/75" : "text-muted-foreground")}>{detail}</span></span>
      <ArrowRight className="ml-auto" />
    </Button>
  );
}
