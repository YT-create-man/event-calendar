export const Y_BASE = "yokosuka" as const;
export const K_BASE = "kounandai" as const;
export const DX_BASE = "dxlab" as const;

export type BaseCode = typeof Y_BASE | typeof K_BASE | typeof DX_BASE;
export type EventKind = "商店主" | "L&W" | "AO生" | "通常";
export type EventStatus = "full" | "few" | "open";

export type EventItem = {
  id: string;
  date: string;
  base: BaseCode;
  baseName: string;
  title: string;
  teacher: string;
  subtitle: string;
  time: string;
  kind: EventKind;
  capacity: number;
  booked: number;
  status?: EventStatus;
  address: string;
  notes: string;
};

const FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd6DuWAlFECX1JFeTfg_D-BWXCSV3ENcPNMFGBICiJR68dVwQ/viewform";

export function buildFormUrl(ev: EventItem): string {
  const params = new URLSearchParams({
    "usp": "pp_url",
    "entry.465157351": ev.id,
    "entry.1432953110": ev.date,
    "entry.1845759388": ev.base,
    "entry.1240345828": ev.title,
  });
  return `${FORM_BASE_URL}?${params.toString()}`;
}

function eventsJsonUrl(): string {
  // Next.js basePath を反映するため assetPrefix 経由で解決
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const m = path.match(/^(\/[^/]+)?\//);
    const base = m && m[1] && m[1] !== "/" ? m[1] : "";
    return `${base}/events.json`;
  }
  return "/events.json";
}

let cache: EventItem[] | null = null;
let inflight: Promise<EventItem[]> | null = null;

export async function loadAllEvents(): Promise<EventItem[]> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(eventsJsonUrl(), { cache: "no-store" });
      if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
      const data = (await res.json()) as EventItem[];
      cache = data;
      return data;
    } catch (e) {
      console.error("loadAllEvents error", e);
      cache = [];
      return [];
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

export function eventsForDate(
  all: EventItem[],
  year: number,
  month: number,
  day: number,
): EventItem[] {
  const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return all.filter((e) => e.date === key);
}

export type MonthCell = { year: number; month: number; day: number; weekday: number } | null;

export function buildMonth(year: number, month: number) {
  const first = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = first.getDay();
  const cells: MonthCell[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ year, month, day: d, weekday: new Date(year, month - 1, d).getDay() });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return { year, month, cells };
}

export function remaining(ev: EventItem) {
  return Math.max(0, ev.capacity - ev.booked);
}

export function statusOf(ev: EventItem): EventStatus {
  if (ev.status) return ev.status;
  const r = remaining(ev);
  if (r === 0) return "full";
  if (r <= Math.max(1, Math.floor(ev.capacity * 0.25))) return "few";
  return "open";
}

export const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];
