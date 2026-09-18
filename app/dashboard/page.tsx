"use client";

import { useState, useSyncExternalStore } from "react";
import type { ReactElement, ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { Variants } from "framer-motion";

import {
  calendarMock,
  currentUser,
  dashboardTasks,
  myEventTiles,
  sidebarPrimaryItems,
  sidebarSecondaryItems,
  topNavLinks,
  upcomingEvents,
} from "@/components/dashboard/mock-data";
import type {
  CalendarMockData,
  DashboardTask,
  DashboardUser,
  MyEventTile,
  TaskPriority,
  TaskStatus,
  UpcomingEvent,
} from "@/components/dashboard/mock-data";

// Entrance animation shared by the main dashboard sections. `MotionConfig
// reducedMotion="user"` (below) automatically strips the transform-based
// part of these animations when the visitor prefers reduced motion.
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

type IconProps = { className?: string };
type IconComponent = (props: IconProps) => ReactElement;

// Formats the utility-row "Today" label from the browser's local date, e.g. "Today, Wed 16 Sep".
function formatTodayLabel(date: Date): string {
  const weekday = date.toLocaleDateString(undefined, { weekday: "short" });
  const month = date.toLocaleDateString(undefined, { month: "short" });
  return `Today, ${weekday} ${date.getDate()} ${month}`;
}

// The real date is only known once we're running in the browser, so `getServerSnapshot`
// returns a fixed "Today" fallback for the server-rendered/first-hydration pass (matching
// on both sides avoids a hydration mismatch), and `getSnapshot` supplies the real,
// browser-local date for every client render after that. No subscription is needed since
// this value never changes without a full page reload.
const subscribeToNothing = () => () => {};

function useTodayLabel(): string {
  return useSyncExternalStore(
    subscribeToNothing,
    () => formatTodayLabel(new Date()),
    () => "Today",
  );
}

/* ------------------------------------------------------------------ */
/* Icons (inline SVGs — no icon package is installed in this project)  */
/* ------------------------------------------------------------------ */

function IconDashboard({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconCalendar({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

function IconChecklist({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m4 6 1.5 1.5L8 5" />
      <path d="M11 6h9" />
      <path d="m4 12 1.5 1.5L8 11" />
      <path d="M11 12h9" />
      <path d="m4 18 1.5 1.5L8 17" />
      <path d="M11 18h9" />
    </svg>
  );
}

function IconUsers({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9.5" r="2.5" />
      <path d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3" />
    </svg>
  );
}

function IconTrophy({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
      <path d="M8 5H5a3 3 0 0 0 3 5" />
      <path d="M16 5h3a3 3 0 0 1-3 5" />
      <path d="M12 13v3" />
      <path d="M9 20h6" />
      <path d="M10 20v-2.5" />
      <path d="M14 20v-2.5" />
    </svg>
  );
}

function IconSettings({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

function IconHelp({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.2 1-1.2 2" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconSearch({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

function IconBell({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
      <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

function IconMenu({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function IconArrowUpRight({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function IconArrowRight({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function IconStar({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5 14.8 8.9 21.8 9.6 16.5 14.2 18 21.1 12 17.4 6 21.1 7.5 14.2 2.2 9.6 9.2 8.9Z" />
    </svg>
  );
}

function IconPin({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconClock({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function IconCheck({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  );
}

function IconChevronLeft({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function IconChevronRight({ className }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

const sidebarIcons: Record<string, IconComponent> = {
  dashboard: IconDashboard,
  events: IconCalendar,
  tasks: IconChecklist,
  members: IconUsers,
  achievements: IconTrophy,
  setting: IconSettings,
  help: IconHelp,
};

/* ------------------------------------------------------------------ */
/* Small presentational primitives                                     */
/* ------------------------------------------------------------------ */

function Badge({ className, children }: { className: string; children: ReactNode }): ReactElement {
  return <span className={`inline-flex items-center text-xs font-medium ${className}`}>{children}</span>;
}

function Checkbox({ checked }: { checked: boolean }): ReactElement {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
        checked ? "border-gdg-green bg-gdg-green text-white" : "border-gray-300 bg-white"
      }`}
      aria-hidden="true"
    >
      {checked && <IconCheck className="h-3.5 w-3.5" />}
    </span>
  );
}

function ArrowBadge({
  label,
  toneClassName,
  iconClassName,
  sizeClassName = "h-8 w-8 sm:h-9 sm:w-9",
}: {
  label: string;
  toneClassName: string;
  iconClassName?: string;
  sizeClassName?: string;
}): ReactElement {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full transition-shadow hover:shadow-md ${sizeClassName} ${toneClassName}`}
    >
      <IconArrowUpRight className={iconClassName ?? "h-4 w-4"} />
    </motion.button>
  );
}

function PaginationDots({ count, activeIndex = 0 }: { count: number; activeIndex?: number }): ReactElement {
  return (
    <div className="flex items-center gap-1.5" role="presentation">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 rounded-full transition-all ${
            index === activeIndex ? "w-4 bg-gdg-dark" : "w-1.5 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

function TopNav(): ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-gdg-dark text-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/gdg-logo.png"
            alt=""
            width={4000}
            height={2250}
            className="h-8 w-auto shrink-0 object-contain sm:h-9 lg:h-10"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">Google Developer Group on Campus</p>
            <p className="truncate text-xs text-white/70">University of Jeddah</p>
          </div>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {topNavLinks.map((link) => (
            <a key={link} href="#" className="text-white/80 transition-colors hover:text-white">
              {link}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="dashboard-mobile-nav"
          aria-label="Toggle navigation menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            id="dashboard-mobile-nav"
            aria-label="Primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold sm:px-6">
              {topNavLinks.map((link) => (
                <a key={link} href="#" className="rounded-lg px-2 py-2 text-white/80 hover:bg-white/10 hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// Desktop (lg+) only — the vertical text+icon sidebar. Below lg, `CompactDashboardNav`
// (rendered inside `main`, further down this file) takes over instead.
function SidebarLink({
  href,
  label,
  Icon,
  active,
  muted = false,
}: {
  href: string;
  label: string;
  Icon: IconComponent;
  active?: boolean;
  muted?: boolean;
}): ReactElement {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
        active
          ? "border-s-4 border-gdg-red bg-gdg-pink-light ps-2.5 font-semibold text-gdg-red"
          : muted
          ? "font-normal text-gray-500 hover:bg-gdg-gray-light hover:text-gdg-dark"
          : "font-semibold text-gray-600 hover:bg-gdg-gray-light hover:text-gdg-dark"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}

function Sidebar({ activeId }: { activeId: string }): ReactElement {
  return (
    <aside className="hidden shrink-0 border-e border-gdg-gray-light bg-white px-3 py-6 lg:block lg:w-60 xl:w-64">
      <nav aria-label="Dashboard sections" className="flex flex-col gap-1">
        {sidebarPrimaryItems.map((item) => (
          <SidebarLink
            key={item.id}
            href={item.id === "dashboard" ? "/dashboard" : "#"}
            label={item.label}
            Icon={sidebarIcons[item.id]}
            active={item.id === activeId}
          />
        ))}
      </nav>

      <div className="my-4 border-t border-gdg-gray-light" />

      <nav aria-label="Account" className="flex flex-col gap-1">
        {sidebarSecondaryItems.map((item) => (
          <SidebarLink key={item.id} href="#" label={item.label} Icon={sidebarIcons[item.id]} muted />
        ))}
      </nav>
    </aside>
  );
}

// Below lg: a single-row, icons-only nav (primary items on the left, Setting/Help on the
// right) rendered inside `main`, after the account/welcome sections. `justify-between` on
// the row splits the two groups; neither group ever wraps (no `flex-wrap` is used), so all
// seven icons stay on one line even at narrow phone widths.
function NavIconButton({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: IconComponent;
  active?: boolean;
}): ReactElement {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
        active ? "bg-gdg-pink-light text-gdg-red" : "text-gray-500 hover:bg-gdg-gray-light hover:text-gdg-dark"
      }`}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

function CompactDashboardNav({ activeId }: { activeId: string }): ReactElement {
  return (
    <nav aria-label="Dashboard" className="flex items-center justify-between gap-2 lg:hidden">
      <div className="flex items-center gap-1" role="group" aria-label="Dashboard sections">
        {sidebarPrimaryItems.map((item) => (
          <NavIconButton
            key={item.id}
            href={item.id === "dashboard" ? "/dashboard" : "#"}
            label={item.label}
            Icon={sidebarIcons[item.id]}
            active={item.id === activeId}
          />
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-1" role="group" aria-label="Account">
        {sidebarSecondaryItems.map((item) => (
          <NavIconButton key={item.id} href="#" label={item.label} Icon={sidebarIcons[item.id]} />
        ))}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard content sections                                          */
/* ------------------------------------------------------------------ */

function SearchField({
  searchQuery,
  onSearchChange,
  className = "",
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  className?: string;
}): ReactElement {
  return (
    <label className={`relative block w-full ${className}`}>
      <span className="sr-only">Search events, or tasks</span>
      <IconSearch className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search events, or tasks..."
        maxLength={255}
        className="w-full rounded-full border border-gdg-gray-light bg-gdg-gray-light/60 py-2 ps-9 pe-4 text-sm text-gdg-dark placeholder:text-gray-400 focus:border-gdg-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-gdg-blue/30"
      />
    </label>
  );
}

// Phone: [account+bell] left, [date] pushed to the far right via `ms-auto` on the date
// element — search is hidden here and reappears lower in the page, after the internal nav.
// Tablet: [date][bell][account] one compact group (account rightmost within it), search on
// the right of the same row. Desktop (unchanged): search left, account group right — achieved
// by flipping `order` at `lg` rather than duplicating markup. Within the group, only the
// `order`/`ms-auto` on these three items change per breakpoint; nothing is re-parented.
function UtilityRow({
  user,
  today,
  searchQuery,
  onSearchChange,
}: {
  user: DashboardUser;
  today: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}): ReactElement {
  return (
    <motion.div variants={itemVariants} className="flex items-center justify-between gap-3">
      <div className="order-1 flex w-full items-center gap-2 sm:w-auto lg:order-2">
        <div className="order-1 flex items-center gap-2.5 lg:order-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gdg-blue-light text-sm font-semibold text-gdg-dark">
            {user.initials}
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-gdg-dark">{user.name}</p>
            <p className="text-xs text-gray-500">
              {user.role} &middot; {user.membership}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative order-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gdg-gray-light hover:text-gdg-dark"
        >
          <IconBell className="h-5 w-5" />
          <span className="absolute end-2 top-2 h-1.5 w-1.5 rounded-full bg-gdg-red" aria-hidden="true" />
        </button>

        <p className="order-3 ms-auto shrink-0 text-xs font-medium text-gray-500 sm:ms-0 sm:text-sm lg:order-1">
          {today}
        </p>
      </div>

      <SearchField
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        className="order-2 hidden sm:block sm:max-w-xs lg:order-1"
      />
    </motion.div>
  );
}

function WelcomeSection({ firstName }: { firstName: string }): ReactElement {
  return (
    <motion.div variants={itemVariants}>
      <h1 className="text-2xl font-semibold text-gdg-dark sm:text-3xl">
        Welcome back, {firstName}! <span aria-hidden="true">👋</span>
      </h1>
      <p className="mt-1 text-sm text-gray-500 sm:text-base">Build, learn, and create impact together</p>
    </motion.div>
  );
}

function MyEventCard({ tile }: { tile: MyEventTile }): ReactElement {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className={`relative flex min-w-0 flex-col justify-between gap-1.5 rounded-xl p-2.5 sm:gap-2 sm:p-3 ${tile.background}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-gdg-dark">{tile.title}</p>
        <ArrowBadge
          label="View my events"
          toneClassName="bg-white"
          iconClassName={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${tile.accent}`}
          sizeClassName="h-6 w-6 sm:h-7 sm:w-7"
        />
      </div>
      <p className="text-xs text-gdg-dark/70">{tile.description}</p>
    </motion.div>
  );
}

// Phone and tablet both show a 2x2 grid; only large/desktop screens go to one row of four.
function MyEventsGrid({ tiles }: { tiles: MyEventTile[] }): ReactElement {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4"
    >
      {tiles.map((tile) => (
        <MyEventCard key={tile.id} tile={tile} />
      ))}
    </motion.div>
  );
}

function UpcomingEventsCard({ events }: { events: UpcomingEvent[] }): ReactElement {
  const hasEvents = events.length > 0;
  const event = events[0];

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gdg-gray-light sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gdg-dark sm:text-lg">Upcoming Events</h2>
        <ArrowBadge
          label="View upcoming events"
          toneClassName="bg-gdg-yellow-accent"
          iconClassName="h-3.5 w-3.5 text-gdg-dark"
          sizeClassName="h-7 w-7 sm:h-8 sm:w-8"
        />
      </div>

      {hasEvents ? (
        <>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2b2b2b] via-gdg-dark to-black">
            {event.imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- backend-provided URL of unknown origin; next/image would need a remote pattern we don't have yet. */}
                <img src={event.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
                  aria-hidden="true"
                />
              </>
            ) : (
              <IconCalendar className="pointer-events-none absolute end-3 top-3 h-16 w-16 text-white/10" />
            )}
            <div className="relative flex aspect-[16/7] flex-col justify-between p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg bg-white px-2.5 py-1 leading-none text-gdg-dark shadow-sm">
                  <span className="text-base font-bold">{event.day}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide">{event.month}</span>
                </div>
                {event.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gdg-yellow-accent px-2.5 py-1 text-[11px] font-semibold text-gdg-dark">
                    <IconStar className="h-3 w-3" />
                    Featured
                  </span>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-white sm:text-lg">{event.title}</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1">
                      <IconPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                    <span aria-hidden="true">&bull;</span>
                    <span className="inline-flex items-center gap-1">
                      <IconClock className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gdg-dark sm:text-sm"
                  >
                    Add to Calendar
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-center">
            <PaginationDots count={3} activeIndex={0} />
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-xl bg-gdg-gray-light/40 px-4 py-10 text-center">
          <p className="text-sm text-gray-400">You don&apos;t have any events.</p>
        </div>
      )}
    </motion.div>
  );
}

// Days-of-month for a calendar month grid, left-padded with `null` so the first
// real day lands under the correct weekday column, and right-padded to a full week.
function getMonthGridDays(year: number, month: number): (number | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarCard({ data }: { data: CalendarMockData }): ReactElement {
  const [view, setView] = useState({ year: data.year, month: data.month });

  const goToPreviousMonth = () => {
    setView((current) =>
      current.month === 0 ? { year: current.year - 1, month: 11 } : { year: current.year, month: current.month - 1 },
    );
  };

  const goToNextMonth = () => {
    setView((current) =>
      current.month === 11 ? { year: current.year + 1, month: 0 } : { year: current.year, month: current.month + 1 },
    );
  };

  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
  const cells = getMonthGridDays(view.year, view.month);
  const isSelectedMonthInView = view.year === data.year && view.month === data.month;

  const selectedDateLabel = new Date(data.year, data.month, data.selectedDay).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const hasSelectedEvent = data.eventDays.includes(data.selectedDay);

  return (
    <motion.div
      variants={itemVariants}
      className="flex h-fit flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gdg-gray-light sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={goToPreviousMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gdg-gray-light hover:text-gdg-dark"
        >
          <IconChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-gdg-dark">{monthLabel}</p>
        <button
          type="button"
          aria-label="Next month"
          onClick={goToNextMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gdg-gray-light hover:text-gdg-dark"
        >
          <IconChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {WEEKDAY_LABELS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, index) => {
          if (day === null) {
            return <span key={index} />;
          }
          const isSelected = isSelectedMonthInView && day === data.selectedDay;
          const hasEvent = isSelectedMonthInView && data.eventDays.includes(day);
          return (
            <div key={index} className="flex items-center justify-center py-0.5">
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  isSelected ? "bg-gdg-red font-semibold text-white" : "text-gdg-dark"
                }`}
              >
                {day}
                {hasEvent && !isSelected && (
                  <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-gdg-blue-accent" aria-hidden="true" />
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl bg-gdg-gray-light/60 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Today</p>
        <p className="mt-0.5 text-sm font-semibold text-gdg-dark">{selectedDateLabel}</p>
        <p className="mt-1 text-xs text-gray-500">{hasSelectedEvent ? "1 event scheduled" : "No events scheduled"}</p>
      </div>
    </motion.div>
  );
}

type FilterId = "all" | TaskStatus;

const taskFilters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "In Progress", label: "In progress" },
  { id: "To Do", label: "To Do" },
  { id: "Complete", label: "Complete" },
];

// Single source of truth for each semantic tone's light background + text color, so
// status badges, priority badges, and task filters can never drift out of sync — they
// all read the exact same class string for a given tone.
const toneColors = {
  red: "bg-gdg-pink-light text-gdg-red",
  yellow: "bg-gdg-yellow-accent/25 text-amber-800",
  blue: "bg-gdg-blue-light text-blue-700",
  green: "bg-gdg-green-light text-emerald-700",
} as const;

type Tone = keyof typeof toneColors;

// Status badges are the visual source of truth for shape (pill/capsule) and sizing.
const PILL_SHAPE = "rounded-full px-2.5 py-1";

const statusTones: Record<TaskStatus, Tone> = {
  "In Progress": "yellow",
  "To Do": "blue",
  Complete: "green",
};

const statusStyles: Record<TaskStatus, string> = {
  "In Progress": `${PILL_SHAPE} ${toneColors[statusTones["In Progress"]]}`,
  "To Do": `${PILL_SHAPE} ${toneColors[statusTones["To Do"]]}`,
  Complete: `${PILL_SHAPE} ${toneColors[statusTones.Complete]}`,
};

// Priority badges reuse the exact same pill shape and tone colors as the status badges
// (Medium shares In Progress's tone, Low shares Complete's tone) — same design system,
// only the semantic mapping differs.
const priorityTones: Record<TaskPriority, Tone> = {
  High: "red",
  Medium: statusTones["In Progress"],
  Low: statusTones.Complete,
};

const priorityStyles: Record<TaskPriority, string> = {
  High: `${PILL_SHAPE} ${toneColors[priorityTones.High]}`,
  Medium: `${PILL_SHAPE} ${toneColors[priorityTones.Medium]}`,
  Low: `${PILL_SHAPE} ${toneColors[priorityTones.Low]}`,
};

// Only the SELECTED filter shows its semantic tone; every other filter stays a plain
// white pill (never gray) until it's selected — the pastel fill itself is the only
// selection indicator, so there's no separate active ring.
const filterTones: Record<FilterId, Tone> = {
  all: "red",
  "In Progress": statusTones["In Progress"],
  "To Do": statusTones["To Do"],
  Complete: statusTones.Complete,
};

function TasksPanel({ tasks, searchQuery }: { tasks: DashboardTask[]; searchQuery: string }): ReactElement {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const counts: Record<FilterId, number> = {
    all: tasks.length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    Complete: tasks.filter((task) => task.status === "Complete").length,
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = activeFilter === "all" || task.status === activeFilter;
    const matchesSearch = normalizedQuery.length === 0 || task.title.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.section
      variants={itemVariants}
      aria-labelledby="my-tasks-heading"
      className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gdg-gray-light sm:p-4 lg:p-5"
    >
      <div className="mb-3 flex flex-col gap-3 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <h2 id="my-tasks-heading" className="flex items-center gap-2 text-lg font-semibold text-gdg-dark">
          <IconChecklist className="h-5 w-5 shrink-0" />
          My Tasks
        </h2>

        <div className="flex flex-wrap items-center gap-2 sm:justify-center" role="group" aria-label="Filter tasks by status">
          {taskFilters.map((filter) => {
            const isActive = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                  isActive ? `border-transparent ${toneColors[filterTones[filter.id]]}` : "border-gdg-gray-light bg-white text-gdg-dark"
                }`}
              >
                {filter.label} ({counts[filter.id]})
              </button>
            );
          })}

          {/* Mobile only: inline in the wrapping filter row so it lands, pushed to the far
              end, on whichever line the last filter pill wraps onto. Replaced by the
              separate right-aligned copy below from `sm:` up. */}
          <div className="ms-auto sm:hidden">
            <ArrowBadge label="View all tasks" toneClassName="bg-gdg-blue-light" iconClassName="h-4 w-4 text-gdg-blue" />
          </div>
        </div>

        <div className="hidden sm:flex sm:justify-end">
          <ArrowBadge label="View all tasks" toneClassName="bg-gdg-blue-light" iconClassName="h-4 w-4 text-gdg-blue" />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="rounded-xl bg-gdg-gray-light/60 px-4 py-5 text-center text-sm text-gray-500">
          No tasks match your filters.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-hidden md:block">
            <table className="w-full table-fixed border-collapse text-start text-sm">
              <colgroup>
                <col className="w-10" />
                <col className="w-[40%]" />
                <col className="w-[18%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
              </colgroup>
              <thead>
                <tr className="bg-gdg-gray-light/60 text-start text-xs font-medium uppercase tracking-wide text-gray-400">
                  <th scope="col" className="rounded-s-lg py-2 ps-3" />
                  <th scope="col" className="py-2 text-start">
                    Task
                  </th>
                  <th scope="col" className="py-2 text-start">
                    Deadline
                  </th>
                  <th scope="col" className="py-2 text-start">
                    Priority
                  </th>
                  <th scope="col" className="rounded-e-lg py-2 pe-3 text-start">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-gdg-gray-light last:border-0"
                  >
                    <td className="py-2.5 ps-1">
                      <Checkbox checked={task.status === "Complete"} />
                    </td>
                    <td className="py-2.5 pe-4">
                      <p className="truncate text-sm font-medium text-gdg-dark">{task.title}</p>
                      <p className="truncate text-xs text-gray-500">{task.description}</p>
                    </td>
                    <td className="py-2.5 pe-4 text-gray-600">{task.deadline}</td>
                    <td className="py-2.5 pe-4">
                      <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
                    </td>
                    <td className="py-2.5">
                      <Badge className={statusStyles[task.status]}>{task.status}</Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 md:hidden">
            {filteredTasks.map((task, index) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="rounded-xl border border-gdg-gray-light p-2.5"
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={task.status === "Complete"} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gdg-dark">{task.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{task.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500">{task.deadline}</span>
                      <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
                      <Badge className={statusStyles[task.status]}>{task.status}</Badge>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-3 flex justify-center md:justify-start">
        <PaginationDots count={3} activeIndex={0} />
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function DashboardPage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const today = useTodayLabel();

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-full flex-1 flex-col bg-white text-gdg-dark">
        <TopNav />
        <div className="flex flex-1 flex-col lg:flex-row">
          <Sidebar activeId="dashboard" />
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="min-w-0 flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
          >
            <UtilityRow user={currentUser} today={today} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <WelcomeSection firstName={currentUser.name.split(" ")[0]} />
            <CompactDashboardNav activeId="dashboard" />
            <SearchField searchQuery={searchQuery} onSearchChange={setSearchQuery} className="sm:hidden" />
            <MyEventsGrid tiles={myEventTiles} />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
              <UpcomingEventsCard events={upcomingEvents} />
              <CalendarCard data={calendarMock} />
            </div>
            <TasksPanel tasks={dashboardTasks} searchQuery={searchQuery} />
          </motion.main>
        </div>
      </div>
    </MotionConfig>
  );
}
