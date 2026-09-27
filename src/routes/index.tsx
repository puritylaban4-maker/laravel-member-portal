import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Eye,
  EyeOff,
  FileText,
  HandCoins,
  Home,
  LayoutGrid,
  Lightbulb,
  Menu,
  Phone,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { useRef, useState, type ComponentType, type ReactNode } from "react";

import logoAsset from "@/assets/khwwc-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

const stats = [
  { icon: CircleDollarSign, tone: "green", label: "Total contributions", value: "KSh 7,800", note: "↑ KSh 300 this month" },
  { icon: CalendarDays, tone: "blue", label: "Next due date", value: "5 Oct 2026", note: "◷ In 8 days" },
  { icon: ShieldCheck, tone: "amber", label: "Penalty wallet", value: "KSh 250", note: "⚠ Available" },
  { icon: UsersRound, tone: "purple", label: "Membership status", value: "Active", note: "12 months paid" },
];

const activity = [
  { icon: Check, tone: "green", title: "Contribution received", detail: "Monthly contribution · Ref: QHZ8X12345", amount: "+ KSh 300", date: "7 Sep 2026 · 10:24 AM" },
  { icon: FileText, tone: "blue", title: "Statement downloaded", detail: "Contribution statement", amount: "", date: "7 Sep 2026 · 8:12 AM" },
  { icon: UserRound, tone: "amber", title: "Beneficiary updated", detail: "Added dependant", amount: "", date: "4 Sep 2026 · 4:32 PM" },
  { icon: ArrowRight, tone: "purple", title: "STK payment initiated", detail: "KSh 300 · Ref: KHWWC02456", amount: "Pending", date: "3 Sep 2026 · 11:15 AM" },
];

const nav = [
  { label: "Home", icon: Home },
  { label: "Wallet", icon: WalletCards },
  { label: "Pay", icon: HandCoins },
  { label: "Contributions", icon: TrendingUp },
  { label: "More", icon: LayoutGrid },
];

const months = [
  { name: "Oct 2025", status: "paid" }, { name: "Nov 2025", status: "paid" },
  { name: "Dec 2025", status: "paid" }, { name: "Jan 2026", status: "paid" },
  { name: "Feb 2026", status: "paid" }, { name: "Mar 2026", status: "late" },
  { name: "Apr 2026", status: "paid" }, { name: "May 2026", status: "paid" },
  { name: "Jun 2026", status: "missed" }, { name: "Jul 2026", status: "paid" },
  { name: "Aug 2026", status: "paid" }, { name: "Sep 2026", status: "paid" },
  { name: "Oct 2026", status: "upcoming" }, { name: "Nov 2026", status: "upcoming" },
  { name: "Dec 2026", status: "upcoming" },
] as const;

const monthTone = {
  paid: "bg-success border-success/50",
  late: "bg-warning border-warning/50",
  missed: "bg-destructive border-destructive/50",
  upcoming: "bg-muted border-border",
};

function MemberDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [active, setActive] = useState("Home");
  const [popup, setPopup] = useState<"notifications" | "menu" | null>(null);
  const [panel, setPanel] = useState<"payment" | "statements" | "beneficiaries" | "documents" | "profile" | null>(null);
  const [amount, setAmount] = useState("300");
  const [phone, setPhone] = useState("");
  const walletRef = useRef<HTMLElement>(null);
  const contributionsRef = useRef<HTMLElement>(null);
  const selectNav = (label: string) => {
    setActive(label);
    if (label === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
    if (label === "Wallet") walletRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (label === "Pay") setPanel("payment");
    if (label === "Contributions") contributionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (label === "More") setPopup("menu");
  };

  return (
    <div className="min-h-screen bg-background pb-[74px] text-foreground lg:pb-0">
      <div className="mx-auto max-w-[1180px] px-3 py-3 sm:px-6 sm:py-5">
        <header className="mb-3 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative shrink-0">
              <span className="flex size-14 items-center justify-center rounded-full border-[3px] border-primary bg-card font-display text-base font-bold shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:size-16">LM</span>
              <img src={logoAsset.url} alt="KHWWC" className="absolute -bottom-1 -right-1 size-6 rounded-full border-2 border-background object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-bold sm:text-2xl">Hello, Laban <span className="text-primary">♛</span></h1>
              <p className="text-xs font-medium sm:text-sm">Member Dashboard</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">KHWWC · Member ID: KHWWC-0241</p>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setPopup(popup === "notifications" ? null : "notifications")} className="relative rounded-full border border-border bg-card"><Bell /><span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">3</span></Button>
            <Button variant="ghost" size="icon" aria-label="Menu" onClick={() => setPopup(popup === "menu" ? null : "menu")} className="rounded-full"><Menu /></Button>
            {popup && <Popup title={popup === "notifications" ? "Notifications" : "Member menu"} onClose={() => setPopup(null)}>{popup === "notifications" ? <><p className="text-sm font-semibold">Contribution received</p><p className="mt-1 text-xs text-muted-foreground">Your KSh 300 payment was posted successfully.</p></> : <div className="space-y-1"><PopupRow icon={UserRound} label="My profile" onClick={() => { setPanel("profile"); setPopup(null); }} /><PopupRow icon={ShieldCheck} label="Membership" onClick={() => { contributionsRef.current?.scrollIntoView({ behavior: "smooth" }); setPopup(null); }} /><PopupRow icon={FileText} label="Documents" onClick={() => { setPanel("documents"); setPopup(null); }} /></div>}</Popup>}
          </div>
        </header>

        <div className="mb-3 flex justify-end"><span className="inline-flex items-center gap-1.5 rounded-full border border-success/35 bg-success/10 px-3 py-1 text-[10px] font-medium text-success sm:text-xs"><span className="size-2 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />Active Member</span></div>

        <main className="space-y-3">
          <section ref={walletRef} className="wallet-glow relative overflow-hidden rounded-lg border border-primary bg-panel-strong scroll-mt-5">
            <div className="relative flex min-h-[132px] items-center gap-4 p-4 sm:min-h-[150px] sm:p-6">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground min-[350px]:flex"><WalletCards className="size-7" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold sm:text-base">Wallet Balance<Button variant="ghost" size="icon" aria-label={balanceVisible ? "Hide balance" : "Show balance"} onClick={() => setBalanceVisible(!balanceVisible)} className="size-7 text-muted-foreground hover:bg-accent">{balanceVisible ? <Eye /> : <EyeOff />}</Button></div>
                <p className="mt-1 font-display text-[1.85rem] font-bold leading-none tabular-nums sm:text-4xl">{balanceVisible ? "KSh 12,450.00" : "KSh ••••••"}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-muted-foreground sm:text-xs"><span>Available: <strong className="text-foreground">KSh 12,250.00</strong></span><span>Pending: <strong className="text-foreground">KSh 200.00</strong></span></div>
              </div>
              <ChevronRight className="size-6 shrink-0" />
            </div>
          </section>

          <section className="grid grid-cols-4 gap-1.5 sm:gap-3">{stats.map((item) => <Stat key={item.label} {...item} />)}</section>

          <section className="grid grid-cols-2 gap-2 sm:gap-3">
            <QuickAction icon={HandCoins} title="Make a Payment" detail="Pay via M-Pesa STK Push" primary onClick={() => setPanel("payment")} />
            <QuickAction icon={FileText} title="View Statements" detail="Download & print" onClick={() => setPanel("statements")} />
          </section>

          <section ref={contributionsRef} className="scroll-mt-5 rounded-lg border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><TrendingUp className="size-6" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3"><h2 className="text-xs font-semibold sm:text-sm">Contribution Progress</h2><span className="text-[10px] text-muted-foreground sm:text-xs">8/12 months</span></div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-[81%] rounded-full bg-gradient-to-r from-primary to-warning" /></div>
                <div className="mt-1.5 flex justify-between text-[10px] sm:text-xs"><span><strong className="text-warning">KSh 7,800</strong> / KSh 9,600</span><strong>81%</strong></div>
              </div>
            </div>
          </section>

          <section className="scroll-mt-5 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3"><h2 className="font-display text-lg font-bold sm:text-xl">Recent Activity</h2><span className="text-xs text-muted-foreground">Latest updates</span></div>
            <div className="px-4 pb-2">{activity.map((item, index) => <Activity key={item.title} {...item} last={index === activity.length - 1} />)}</div>
          </section>

          <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
            <section className="rounded-lg border border-border bg-card p-4 sm:p-5" aria-labelledby="calendar-heading">
              <div className="mb-4 flex items-center justify-between gap-3"><div><h2 id="calendar-heading" className="font-display text-lg font-bold">Contribution Calendar</h2><p className="text-xs text-muted-foreground">Monthly payment history</p></div><CalendarDays className="size-5 text-primary" /></div>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">{months.map((month) => <div key={month.name} className="min-w-0 text-center"><div title={`${month.name}: ${month.status}`} aria-label={`${month.name}: ${month.status}`} className={cn("mx-auto mb-1.5 aspect-square w-full max-w-11 rounded-md border", monthTone[month.status])} /><span className="block truncate text-[9px] text-muted-foreground">{month.name.slice(0, 3)}</span></div>)}</div>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-muted-foreground">{(["paid", "late", "missed", "upcoming"] as const).map((status) => <span key={status} className="inline-flex items-center gap-1.5 capitalize"><span className={cn("size-2.5 rounded-sm", monthTone[status])} />{status}</span>)}</div>
            </section>
            <section className="rounded-lg border border-border bg-card p-4 sm:p-5" aria-labelledby="insights-heading">
              <div className="mb-3 flex items-center gap-2"><Lightbulb className="size-5 text-warning" /><h2 id="insights-heading" className="font-display text-lg font-bold">Smart Insights</h2></div>
              <div className="divide-y divide-border">
                <Insight title="Next contribution due" text="5 October · KSh 300" icon={CalendarDays} />
                <Insight title="Penalty wallet available" text="KSh 250 ready if needed" icon={WalletCards} />
                <Insight title="Your contribution history" text="Review paid, late and upcoming months" icon={TrendingUp} />
              </div>
            </section>
          </div>

          <section className="pb-4" aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="mb-3 font-display text-lg font-bold">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {([{ icon: HandCoins, label: "Pay Now", target: "payment" }, { icon: ReceiptText, label: "Statement", target: "statements" }, { icon: UsersRound, label: "Beneficiaries", target: "beneficiaries" }, { icon: FileText, label: "Documents", target: "documents" }] as const).map(({ icon: Icon, label, target }) => <Button key={label} variant="outline" onClick={() => setPanel(target)} className="h-20 min-w-0 flex-col gap-2 rounded-lg border-border bg-card px-1 text-[10px] transition-shadow hover:shadow-[0_0_16px_color-mix(in_oklab,var(--primary)_20%,transparent)] sm:text-xs"><Icon className="text-primary" /><span className="max-w-full truncate">{label}</span></Button>)}
            </div>
          </section>
        </main>
      </div>

       <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-panel-strong px-1 pb-[max(.35rem,env(safe-area-inset-bottom))] pt-1.5 shadow-2xl"><div className="mx-auto grid max-w-xl grid-cols-5">{nav.map((item) => <Button key={item.label} variant="ghost" onClick={() => selectNav(item.label)} className={cn("h-14 flex-col gap-0.5 rounded-md px-0 text-[9px] text-muted-foreground hover:bg-accent hover:text-foreground sm:text-[10px]", active === item.label && "text-primary", item.label === "Pay" && "-mt-4")}><span className={cn(item.label === "Pay" && "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_50%,transparent)]")}><item.icon className="size-5" /></span>{item.label}</Button>)}</div></nav>
       <Dialog open={panel !== null} onOpenChange={(open) => { if (!open) setPanel(null); }}>
         <DialogContent className="max-h-[90dvh] w-[calc(100vw-1.5rem)] max-w-md overflow-y-auto rounded-lg border-border bg-panel p-5 sm:p-6">
           {panel === "payment" ? <>
             <DialogHeader className="text-left"><DialogTitle className="font-display text-xl">Make a Payment</DialogTitle><DialogDescription>Review your M-Pesa payment details.</DialogDescription></DialogHeader>
             <div className="my-2 flex justify-center"><span className="payment-phone flex size-20 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Phone className="size-9" /></span></div>
             <div className="space-y-3"><label className="block text-xs font-medium" htmlFor="payment-amount">Amount (KSh)</label><Input id="payment-amount" inputMode="decimal" type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} className="border-border bg-background" /><label className="block text-xs font-medium" htmlFor="payment-phone">M-Pesa phone number</label><Input id="payment-phone" inputMode="tel" type="tel" placeholder="07XX XXX XXX" value={phone} onChange={(event) => setPhone(event.target.value)} className="border-border bg-background" /></div>
             <div className="rounded-md border border-warning/30 bg-warning/10 p-3 text-xs text-muted-foreground">Payments are not yet connected. No STK prompt will be sent, and no payment will be recorded.</div>
             <Button disabled className="w-full">Pay {Number(amount) > 0 ? `KSh ${Number(amount).toLocaleString("en-KE")}` : "now"}</Button>
           </> : <><DialogHeader className="text-left"><DialogTitle className="font-display text-xl">{panel === "statements" ? "Statements" : panel === "beneficiaries" ? "Beneficiaries" : panel === "documents" ? "Documents" : "My profile"}</DialogTitle><DialogDescription>This information will appear when your Laravel account data is connected. No records are available in this preview.</DialogDescription></DialogHeader><Button variant="outline" onClick={() => setPanel(null)}>Close</Button></>}
         </DialogContent>
       </Dialog>
    </div>
  );
}

const toneClasses: Record<string, string> = {
  green: "bg-success/20 text-success",
  blue: "bg-chart-3/25 text-chart-2",
  amber: "bg-warning/20 text-warning",
  purple: "bg-chart-4/20 text-chart-4",
};

function Stat({ icon: Icon, tone, label, value, note }: { icon: IconType; tone: string; label: string; value: string; note: string }) {
  return <article className="min-w-0 rounded-lg border border-border bg-card px-2 py-3 sm:p-4"><span className={cn("mb-2 flex size-8 items-center justify-center rounded-full sm:size-10", toneClasses[tone])}><Icon className="size-4 sm:size-5" /></span><p className="min-h-7 text-[8px] leading-tight text-muted-foreground sm:min-h-0 sm:text-xs">{label}</p><p className="mt-1 break-words font-display text-[11px] font-bold leading-tight sm:text-lg">{value}</p><p className={cn("mt-1 text-[7px] leading-tight sm:text-[11px]", tone === "green" ? "text-success" : tone === "amber" ? "text-warning" : "text-muted-foreground")}>{note}</p></article>;
}

function QuickAction({ icon: Icon, title, detail, primary = false, onClick }: { icon: IconType; title: string; detail: string; primary?: boolean; onClick: () => void }) {
  return <Button variant={primary ? "default" : "outline"} onClick={onClick} className="h-[62px] min-w-0 justify-start rounded-lg px-3 text-left sm:h-[72px] sm:px-5"><span className={cn("hidden size-9 shrink-0 items-center justify-center rounded-full min-[350px]:flex", primary ? "bg-primary-foreground/15" : "bg-muted")}><Icon className="size-4" /></span><span className="min-w-0"><span className="block truncate text-[11px] font-bold sm:text-sm">{title}</span><span className={cn("mt-1 block truncate text-[8px] font-normal sm:text-xs", primary ? "text-primary-foreground/70" : "text-muted-foreground")}>{detail}</span></span><ChevronRight className="ml-auto size-4 shrink-0" /></Button>;
}

function Activity({ icon: Icon, tone, title, detail, amount, date, last }: { icon: IconType; tone: string; title: string; detail: string; amount: string; date: string; last: boolean }) {
  return <div className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-2.5 sm:gap-3">{!last && <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-10 w-px bg-border sm:left-[19px]" />}<span className={cn("relative z-10 flex size-8 items-center justify-center rounded-full sm:size-10", toneClasses[tone])}><Icon className="size-4 sm:size-5" /></span><div className="min-w-0"><p className="truncate text-[10px] font-medium sm:text-sm">{title}</p><p className="truncate text-[8px] text-muted-foreground sm:text-[11px]">{detail}</p></div><div className="max-w-24 text-right text-[7px] sm:max-w-none sm:text-[10px]">{amount && <p className={cn("font-semibold", amount.startsWith("+") ? "text-success" : "text-warning")}>{amount}</p>}<p className="text-muted-foreground">{date}</p></div></div>;
}

function Insight({ title, text, icon: Icon }: { title: string; text: string; icon: IconType }) {
  return <div className="flex items-start gap-3 py-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon /></span><div><p className="text-xs font-semibold sm:text-sm">{title}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{text}</p></div></div>;
}

function Popup({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return <div className="absolute right-0 top-12 z-50 w-[min(21rem,calc(100vw-1.5rem))] rounded-lg border border-border bg-popover p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><p className="font-display font-bold">{title}</p><Button variant="ghost" size="icon" onClick={onClose} aria-label={`Close ${title}`}><X /></Button></div>{children}</div>;
}

function PopupRow({ icon: Icon, label, onClick }: { icon: IconType; label: string; onClick: () => void }) {
  return <Button variant="ghost" onClick={onClick} className="w-full justify-start"><Icon />{label}</Button>;
}