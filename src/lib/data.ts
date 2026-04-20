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

type EventTemplate = { title: string; teacher: string };

const YOKO_DEFAULTS: EventTemplate[] = [
  { title: "こども造形ワークショップ", teacher: "山田 あきこ" },
  { title: "親子プログラミング", teacher: "佐藤 健" },
  { title: "地域交流カフェ", teacher: "高橋 美咲" },
  { title: "読み聞かせタイム", teacher: "伊藤 順子" },
  { title: "英会話ひろば", teacher: "Emily Parker" },
  { title: "工作クラブ", teacher: "木村 翔" },
  { title: "おはなし会", teacher: "鈴木 久美子" },
  { title: "クラフト体験", teacher: "渡辺 彩" },
];

const KOU_DEFAULTS: EventTemplate[] = [
  { title: "放課後クラブ", teacher: "田中 ひろし" },
  { title: "手づくりおやつ", teacher: "中村 さゆり" },
  { title: "絵本の時間", teacher: "小林 まり" },
  { title: "ボードゲーム大会", teacher: "加藤 涼" },
  { title: "書道教室", teacher: "松本 泰斗" },
  { title: "粘土あそび", teacher: "藤田 ひかる" },
  { title: "リズム遊び", teacher: "岡田 奈々" },
  { title: "科学じっけん", teacher: "清水 博士" },
];

type SeminarDate = {
  year: number;
  month: number;
  day: number;
  base: BaseCode;
  teacher: string;
};

export const SEMINAR_DATES: SeminarDate[] = [
  { year: 2026, month: 5, day: 20, base: Y_BASE, teacher: "三浦 和夫（商店主会 会長）" },
  { year: 2026, month: 6, day: 10, base: Y_BASE, teacher: "三浦 和夫（商店主会 会長）" },
  { year: 2026, month: 6, day: 3, base: K_BASE, teacher: "長谷川 豊（商店主会 副会長）" },
  { year: 2026, month: 6, day: 17, base: K_BASE, teacher: "長谷川 豊（商店主会 副会長）" },
];

function isSeminarDay(year: number, month: number, day: number, base: BaseCode) {
  return SEMINAR_DATES.some(
    (s) => s.year === year && s.month === month && s.day === day && s.base === base,
  );
}

function seminarTeacher(year: number, month: number, day: number, base: BaseCode) {
  const s = SEMINAR_DATES.find(
    (s) => s.year === year && s.month === month && s.day === day && s.base === base,
  );
  return s ? s.teacher : "";
}

function baseEventsForDate(
  year: number,
  month: number,
  day: number,
  weekday: number,
): EventItem[] {
  const events: EventItem[] = [];
  const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const yokoSeminar = isSeminarDay(year, month, day, Y_BASE);
  if (weekday === 2 || weekday === 6 || yokoSeminar) {
    const tpl = YOKO_DEFAULTS[(day + month) % YOKO_DEFAULTS.length];
    events.push({
      id: `${key}-y`,
      base: Y_BASE,
      baseName: "横須賀BASE",
      title: yokoSeminar ? "商店主セミナー" : tpl.title,
      teacher: yokoSeminar ? seminarTeacher(year, month, day, Y_BASE) : tpl.teacher,
      subtitle: yokoSeminar ? "地域で商いを続けるヒント" : "",
      time: "14:00–16:00",
      kind: yokoSeminar ? "seminar" : "regular",
      capacity: yokoSeminar ? 20 : 8,
      booked: yokoSeminar
        ? Math.max(0, 20 - ((day * 3) % 22))
        : Math.max(0, 8 - ((day * 5 + month) % 10)),
      address: "横須賀市本町2-1 BASE 1F",
      notes: "",
    });
  }

  const kouSeminar = isSeminarDay(year, month, day, K_BASE);
  if (weekday === 4 || weekday === 6 || kouSeminar) {
    const tpl = KOU_DEFAULTS[(day + month + 3) % KOU_DEFAULTS.length];
    events.push({
      id: `${key}-k`,
      base: K_BASE,
      baseName: "港南台BASE",
      title: kouSeminar ? "商店主セミナー" : tpl.title,
      teacher: kouSeminar ? seminarTeacher(year, month, day, K_BASE) : tpl.teacher,
      subtitle: kouSeminar ? "地域で商いを続けるヒント" : "",
      time: "14:00–16:00",
      kind: kouSeminar ? "seminar" : "regular",
      capacity: kouSeminar ? 20 : 10,
      booked: kouSeminar
        ? Math.max(0, 20 - ((day * 4 + 1) % 24))
        : Math.max(0, 10 - ((day * 7 + month * 2) % 13)),
      address: "横浜市港南区港南台3-2 BASE 2F",
      notes: "",
    });
  }

  return events;
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
