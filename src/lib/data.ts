export const Y_BASE = "yokosuka" as const;
export const K_BASE = "kounandai" as const;

export type BaseCode = typeof Y_BASE | typeof K_BASE;
export type EventKind = "regular" | "seminar";
export type EventStatus = "full" | "few" | "open";

export type EventItem = {
  id: string;
  base: BaseCode;
  baseName: string;
  title: string;
  teacher: string;
  subtitle: string;
  time: string;
  kind: EventKind;
  capacity: number;
  booked: number;
  address: string;
  notes: string;
};

type ScheduledEvent = {
  year: number;
  month: number;
  day: number;
  base: BaseCode;
  title: string;
  teacher: string;
  subtitle: string;
  time: string;
  kind: EventKind;
  capacity: number;
};

const YOKOSUKA_ADDRESS = "横須賀市大津町1-22-22 SLMC横須賀BASE";
const KOUNANDAI_ADDRESS = "横浜市港南区港南台3-2 BASE 2F";

const SCHEDULED: ScheduledEvent[] = [
  // 横須賀BASE 2026年5月（毎週 火・土 14:00〜 ※16日のみ13:00〜、定員6名）
  {
    year: 2026, month: 5, day: 2, base: Y_BASE,
    title: "生成AI体験", teacher: "", subtitle: "ChatGPTを使ってみよう！",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 5, base: Y_BASE,
    title: "安全講習", teacher: "", subtitle: "PC・スマホを使う際の注意点や活用方法を学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 9, base: Y_BASE,
    title: "マイクラ", teacher: "", subtitle: "マイクラで楽しくPC操作を学ぼう！目指せエンダードラゴン討伐",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 12, base: Y_BASE,
    title: "iPhone基礎講座3", teacher: "", subtitle: "iPhoneの使い方を基礎から（Part1・2未参加も歓迎）",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 16, base: Y_BASE,
    title: "認知症予防講座", teacher: "", subtitle: "救命救急のプロから認知症予防のための知識を学ぶ",
    time: "13:00–15:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 19, base: Y_BASE,
    title: "iPhoneで綺麗な写真を撮ろう", teacher: "", subtitle: "iPhoneで綺麗な写真を撮るコツを学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 23, base: Y_BASE,
    title: "AO入校説明会", teacher: "", subtitle: "デジタルライフプランナー資格のご案内",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 26, base: Y_BASE,
    title: "エンディングノート書こう", teacher: "", subtitle: "終活のプロと始め方・書き方を考える",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },

  // 横須賀BASE 2026年6月（毎週 火・土 14:00〜 ※20日のみ13:00〜、定員6名）
  {
    year: 2026, month: 6, day: 2, base: Y_BASE,
    title: "安全講習", teacher: "", subtitle: "PC・スマホを使う際の注意点や活用方法を学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 6, base: Y_BASE,
    title: "LINEの使い方講座", teacher: "", subtitle: "LINEの使い方を初歩から学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 9, base: Y_BASE,
    title: "生成AIをやってみよう", teacher: "", subtitle: "ChatGPTでの画像生成を学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 13, base: Y_BASE,
    title: "マイクラ", teacher: "", subtitle: "マイクラで楽しくPC操作を学ぼう！目指せエンダードラゴン討伐",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 16, base: Y_BASE,
    title: "安心アルバムを作ろう", teacher: "", subtitle: "もしもの場合に備えて個人情報と写真でアルバムを作成",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 20, base: Y_BASE,
    title: "認知症予防講座", teacher: "", subtitle: "救命救急のプロから認知症予防のための知識を学ぶ",
    time: "13:00–15:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 23, base: Y_BASE,
    title: "生前整理", teacher: "", subtitle: "デジタル遺品（パスワード・写真）の整理方法を終活のプロから学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 27, base: Y_BASE,
    title: "AO入校説明会", teacher: "", subtitle: "デジタルライフプランナー資格のご案内",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },

  // 港南台BASE（現時点で確定している分のみ）
  {
    year: 2026, month: 5, day: 14, base: K_BASE,
    title: "生前整理", teacher: "", subtitle: "",
    time: "14:00–16:00", kind: "regular", capacity: 10,
  },
  {
    year: 2026, month: 6, day: 11, base: K_BASE,
    title: "パーソナルカラー診断", teacher: "", subtitle: "",
    time: "14:00–16:00", kind: "regular", capacity: 10,
  },
];

function deterministicBooked(cap: number, day: number, month: number, base: BaseCode): number {
  const seed = day * 7 + month * 3 + (base === Y_BASE ? 2 : 5);
  return Math.max(0, cap - (seed % (cap + 3)));
}

function baseEventsForDate(
  year: number,
  month: number,
  day: number,
  _weekday: number,
): EventItem[] {
  const matches = SCHEDULED.filter(
    (s) => s.year === year && s.month === month && s.day === day,
  );
  return matches.map((s) => {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const baseCode = s.base === Y_BASE ? "y" : "k";
    const baseName = s.base === Y_BASE ? "横須賀BASE" : "港南台BASE";
    const address = s.base === Y_BASE ? YOKOSUKA_ADDRESS : KOUNANDAI_ADDRESS;
    return {
      id: `${key}-${baseCode}`,
      base: s.base,
      baseName,
      title: s.title,
      teacher: s.teacher,
      subtitle: s.subtitle,
      time: s.time,
      kind: s.kind,
      capacity: s.capacity,
      booked: deterministicBooked(s.capacity, day, month, s.base),
      address,
      notes: "",
    };
  });
}

const STORAGE_KEY = "evcal.edits.v2";

type EditsStore = Record<string, Partial<EventItem>>;

function loadEdits(): EditsStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveEdits(edits: EditsStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
}

export function eventsForDate(
  year: number,
  month: number,
  day: number,
  weekday: number,
): EventItem[] {
  const base = baseEventsForDate(year, month, day, weekday);
  const edits = loadEdits();
  return base.map((ev) => (edits[ev.id] ? { ...ev, ...edits[ev.id] } : ev));
}

export function updateEvent(id: string, patch: Partial<EventItem>) {
  const edits = loadEdits();
  edits[id] = { ...(edits[id] || {}), ...patch };
  saveEdits(edits);
  window.dispatchEvent(new CustomEvent("evcal:updated"));
}

export function resetEvent(id: string) {
  const edits = loadEdits();
  delete edits[id];
  saveEdits(edits);
  window.dispatchEvent(new CustomEvent("evcal:updated"));
}

export function resetAllEdits() {
  saveEdits({});
  window.dispatchEvent(new CustomEvent("evcal:updated"));
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
  const r = remaining(ev);
  if (r === 0) return "full";
  if (r <= Math.max(1, Math.floor(ev.capacity * 0.25))) return "few";
  return "open";
}

export const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];
