import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-silver bg-white/90 px-4 py-3 backdrop-blur-md lg:px-8">
      <label className="ml-12 flex w-full max-w-md items-center gap-2 rounded-xl border border-silver bg-frost px-3.5 py-2.5 lg:ml-0">
        <Search className="size-4 text-navy/45" />
        <input placeholder="Search orders, customers, products..." aria-label="Search admin"
          className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
        <kbd className="hidden rounded-md border border-silver bg-white px-1.5 py-0.5 text-[10px] text-navy/50 sm:block">⌘K</kbd>
      </label>
      <div className="flex items-center gap-2">
        <button aria-label="Notifications, 5 unread" className="relative rounded-full p-2 hover:bg-frost">
          <Bell className="size-5 text-navy/70" />
          <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">5</span>
        </button>
        <button aria-label="Messages, 3 unread" className="relative hidden rounded-full p-2 hover:bg-frost sm:block">
          <MessageSquare className="size-5 text-navy/70" />
          <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">3</span>
        </button>
        <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-frost">
          <span className="flex size-9 items-center justify-center rounded-full bg-ice font-display text-xs font-bold text-navy">PA</span>
          <span className="hidden text-left md:block">
            <span className="block text-sm font-bold text-navy">Palace Admin</span>
            <span className="block text-xs text-navy/55">Super Admin</span>
          </span>
          <ChevronDown className="hidden size-4 text-navy/50 md:block" />
        </button>
      </div>
    </header>
  );
}
