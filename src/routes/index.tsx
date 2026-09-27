import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  HandCoins,
  Home,
  LayoutGrid,
  Menu,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  UserRound,
  UsersRound,
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
      { name: "description", content: "KHWWC member contributions, wallet, statements, and membership status." },
      { property: "og:title", content: "Member Dashboard — KHWWC" },
      { property: "og:description", content: "Secure KHWWC member welfare and contribution dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemberDashboard,
});

type IconType = ComponentType<{ className?: string }>;

const navItems: { label: string; icon: IconType }[] = [
  { label: "Home", icon: Home },
  { label: "Wallet", icon: WalletCards },
  { label: "Pay", icon: HandCoins },
  { label: "Contributions", icon: TrendingUp },
  { label: "More", icon: LayoutGrid },
];

const activity = [
  { icon: Check, tone: "success", title: "Contribution received", detail: "Monthly contribution · Ref QHZ8X12345", amount: "+ KSh 300", date: "7 Sep 2026 · 10:24 AM" },
  { icon: FileText, tone: "blue", title: "Statement downloaded", detail: "Contribution statement", amount: "", date: "7 Sep 2026 · 8:12 AM" },
  { icon: UserRound, tone: "amber", title: "Beneficiary updated", detail: "Added dependant", amount: "", date: "4 Sep 2026 · 4:32 PM" },
  { icon: ArrowRight, tone: "primary", title: "STK payment initiated", detail: "KSh 300 · Ref KHWWC02456", amount: "Pending", date: "3 Sep 2026 · 11:15 AM" },
];

function MemberDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const announce = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2400);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen max-w-[1500px] lg:grid lg:grid-cols-[230px_1fr]">
        <DesktopSidebar active={activeNav} onSelect={setActiveNav} />

        <div className="min-w-0 pb-24 lg:pb-8">
          <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-7 lg:px-9">
              <div className="flex items-center gap-3 lg:hidden">
                <img src={logoAsset.url} alt="KHWWC logo" className="size-12 rounded-full object-cover ring-2 ring-primary" />
                <div><p className="font-display text-base font-bold">KHWWC</p><p className="text-[11px] text-muted-foreground">Member portal</p></div>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-primary">MEMBER DASHBOARD</p>
                <h1 className="font-display text-xl font-bold">Hello, Laban</h1>
              </div>
              <div className="relative flex items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Open notifications" onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative rounded-full border border-border bg-card">
                  <Bell /><span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">3</span>
                </Button>
                <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-border bg-card"><Menu /></Button>
                {notificationsOpen && <Popup title="Notifications" onClose={() => setNotificationsOpen(false)}><p className="text-sm font-semibold">Contribution received</p><p className="mt-1 text-xs text-muted-foreground">Your KSh 300 payment was posted successfully.</p></Popup>}
                {menuOpen && <Popup title="Member menu" onClose={() => setMenuOpen(false)}><div className="space-y-1"><MenuRow icon={UserRound} label="My profile" /><MenuRow icon={ShieldCheck} label="Membership" /><MenuRow icon={FileText} label="Documents" /></div></Popup>}
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1240px] space-y-4 px-4 py-5 sm:px-7 lg:px-9 lg:py-8">
            <section className="flex items-center justify-between gap-3 px-1 lg:hidden">
              <div className="flex items-center gap-3">
                <span className="flex size-14 items-center justify-center rounded-full border-2 border-primary bg-secondary font-display text-lg font-bold">LM</span>
                <div><h2 className="font-display text-xl font-bold">Hello, Laban</h2><p className="text-xs text-muted-foreground">KHWWC · Member ID: KHWWC-0241</p></div>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs text-success min-[370px]:inline-flex"><span className="size-1.5 rounded-full bg-success" />Active</span>
            </section>

            <section className="relative overflow-hidden rounded-lg border border-primary/70 bg-panel-strong shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
              <div className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_65%)]" />
              <div className="relative flex min-h-44 items-center gap-5 p-5 sm:p-7">
                <span className="hidden size-16 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:flex"><WalletCards className="size-8" /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold"><span>Wallet balance</span><Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:bg-accent" aria-label={balanceVisible ? "Hide balance" : "Show balance"} onClick={() => setBalanceVisible(!balanceVisible)}>{balanceVisible ? <Eye /> : <EyeOff />}</Button></div>
                  <p className="mt-1 font-display text-[2rem] font-bold leading-none tabular-nums sm:text-4xl">{balanceVisible ? "KSh 12,450.00" : "KSh ••••••"}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground"><span>Available: <strong className="text-foreground">KSh 12,250.00</strong></span><span>Pending: <strong className="text-foreground">KSh 200.00</strong></span></div>
                </div>
                <ChevronRight className="size-6 text-foreground" />
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard icon={CircleDollarSign} tone="success" label="Total contributions" value="KSh 7,800" note="↑ KSh 300 this month" />
              <StatCard icon={CalendarDays} tone="blue" label="Next due date" value="5 Oct 2026" note="◷ In 8 days" />
              <StatCard icon={ShieldCheck} tone="amber" label="Penalty wallet" value="KSh 250" note="Available" />
              <StatCard icon={UsersRound} tone="violet" label="Membership status" value="Active" note="12 months paid" />
            </section>

            <section className="grid gap-3 sm:grid-cols-2">
              <ActionCard icon={HandCoins} title="Make a payment" detail="Pay via M-Pesa STK Push" primary onClick={() => announce("Payment flow ready to connect")} />
              <ActionCard icon={FileText} title="View statements" detail="Download and print" onClick={() => announce("Statements ready to connect")} />
            </section>

            <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"><TrendingUp className="size-6" /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3"><h2 className="text-sm font-semibold">Contribution progress</h2><span className="text-xs text-muted-foreground">8/12 months</span></div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full w-[81%] rounded-full bg-primary" /></div>
                  <div className="mt-2 flex justify-between text-xs"><span><strong className="text-primary">KSh 7,800</strong> / KSh 9,600</span><strong>81%</strong></div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between px-5 py-4 sm:px-6"><h2 className="font-display text-xl font-bold">Recent activity</h2><Button variant="ghost" className="h-8 px-2 text-xs text-primary" onClick={() => announce("Full activity selected")}>View all <ChevronRight /></Button></div>
              <div className="divide-y divide-border px-5 sm:px-6">
                {activity.map((item) => <ActivityRow key={item.title} {...item} />)}
              </div>
            </section>
          </main>
        </div>
      </div>

      <MobileNav active={activeNav} onSelect={setActiveNav} />
      {message && <div role="status" className="fixed bottom-24 left-1/2 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md border border-primary/40 bg-panel px-4 py-3 text-sm shadow-xl lg:bottom-6">{message}</div>}
    </div>
  );
}

function DesktopSidebar({ active, onSelect }: { active: string; onSelect: (value: string) => void }) {
  return <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-panel-strong p-4 lg:flex">
    <div className="flex items-center gap-3 px-2 py-3"><img src={logoAsset.url} alt="KHWWC logo" className="size-12 rounded-full object-cover ring-2 ring-primary" /><div><p className="font-display font-bold">KHWWC</p><p className="text-[10px] text-muted-foreground">Care · Support · Unity</p></div></div>
    <nav className="mt-8 space-y-1">{navItems.map((item) => <Button key={item.label} variant="ghost" onClick={() => onSelect(item.label)} className={cn("h-11 w-full justify-start text-muted-foreground hover:bg-accent hover:text-foreground", active === item.label && "bg-accent text-primary")}><item.icon />{item.label}</Button>)}</nav>
    <div className="mt-auto rounded-lg border border-border bg-card p-4"><p className="text-sm font-semibold">Need help?</p><p className="mt-1 text-xs text-muted-foreground">Contact the welfare support team.</p><Button variant="ghost" className="mt-3 h-8 px-0 text-xs text-primary">Get support <ArrowRight /></Button></div>
  </aside>;
}

function MobileNav({ active, onSelect }: { active: string; onSelect: (value: string) => void }) {
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-panel-strong px-1 pb-[max(.4rem,env(safe-area-inset-bottom))] pt-1.5 lg:hidden"><div className="mx-auto grid max-w-lg grid-cols-5">{navItems.map((item) => <Button key={item.label} variant="ghost" onClick={() => onSelect(item.label)} className={cn("h-14 flex-col gap-1 rounded-md px-0 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground", active === item.label && "text-primary")}><item.icon className={cn(item.label === "Pay" && "size-6")} />{item.label}</Button>)}</div></nav>;
}

function StatCard({ icon: Icon, tone, label, value, note }: { icon: IconType; tone: string; label: string; value: string; note: string }) {
  const colors: Record<string, string> = { success: "bg-success/15 text-success", blue: "bg-chart-3/20 text-chart-2", amber: "bg-warning/15 text-warning", violet: "bg-chart-4/15 text-chart-4" };
  return <article className="min-w-0 rounded-lg border border-border bg-card p-4"><span className={cn("mb-4 flex size-10 items-center justify-center rounded-full", colors[tone])}><Icon className="size-5" /></span><p className="truncate text-[11px] text-muted-foreground sm:text-xs">{label}</p><p className="mt-1 truncate font-display text-lg font-bold">{value}</p><p className={cn("mt-1 truncate text-[10px] sm:text-xs", tone === "success" ? "text-success" : tone === "amber" ? "text-warning" : "text-muted-foreground")}>{note}</p></article>;
}

function ActionCard({ icon: Icon, title, detail, primary = false, onClick }: { icon: IconType; title: string; detail: string; primary?: boolean; onClick: () => void }) {
  return <Button variant={primary ? "default" : "outline"} onClick={onClick} className="h-[74px] justify-start rounded-lg px-4 text-left"><span className={cn("flex size-11 items-center justify-center rounded-full", primary ? "bg-primary-foreground/15" : "bg-muted text-foreground")}><Icon className="size-5" /></span><span><span className="block text-sm font-bold">{title}</span><span className={cn("mt-1 block text-[11px] font-normal", primary ? "text-primary-foreground/75" : "text-muted-foreground")}>{detail}</span></span><ChevronRight className="ml-auto" /></Button>;
}

function ActivityRow({ icon: Icon, tone, title, detail, amount, date }: { icon: IconType; tone: string; title: string; detail: string; amount: string; date: string }) {
  const colors: Record<string, string> = { success: "bg-success text-success-foreground", blue: "bg-chart-3 text-primary-foreground", amber: "bg-warning text-warning-foreground", primary: "bg-primary text-primary-foreground" };
  return <div className="grid grid-cols-[auto_1fr] gap-3 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-center"><span className={cn("flex size-10 items-center justify-center rounded-full", colors[tone])}><Icon className="size-5" /></span><div className="min-w-0"><p className="truncate text-sm font-medium">{title}</p><p className="truncate text-[10px] text-muted-foreground sm:text-xs">{detail}</p></div><div className="col-start-2 flex items-center justify-between gap-3 text-[10px] sm:col-start-auto sm:block sm:text-right sm:text-xs">{amount && <p className={amount.startsWith("+") ? "font-semibold text-success" : "font-semibold text-warning"}>{amount}</p>}<p className="text-muted-foreground">{date}</p></div></div>;
}

function Popup({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="absolute right-0 top-12 w-[min(21rem,calc(100vw-2rem))] rounded-lg border border-border bg-popover p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><p className="font-display font-bold">{title}</p><Button variant="ghost" size="icon" onClick={onClose} aria-label={`Close ${title}`}><X /></Button></div>{children}</div>;
}

function MenuRow({ icon: Icon, label }: { icon: IconType; label: string }) {
  return <Button variant="ghost" className="w-full justify-start"><Icon />{label}</Button>;
}