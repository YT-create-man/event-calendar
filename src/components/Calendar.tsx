"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildFormUrl,
  buildMonth,
  eventsForDate,
  loadAllEvents,
  remaining,
  statusOf,
  WEEKDAYS_JA,
  type EventItem,
  type MonthCell,
} from "@/lib/data";

type Variant = "soft" | "compact" | "bold";

function baseColorTokens(base: EventItem["base"]) {
  if (base === "yokosuka") {
    return {
      bg: "var(--y-bg)",
      border: "var(--y-border)",
      text: "var(--y-text)",
      dot: "var(--y-dot)",
    };
  }
  if (base === "kounandai") {
    return {
      bg: "var(--k-bg)",
      border: "var(--k-border)",
      text: "var(--k-text)",
      dot: "var(--k-dot)",
    };
  }
  return {
    bg: "var(--dx-bg)",
    border: "var(--dx-border)",
    text: "var(--dx-text)",
    dot: "var(--dx-dot)",
  };
}

function baseClass(base: EventItem["base"]) {
  return base === "yokosuka" ? "y" : base === "kounandai" ? "k" : "dx";
}

function isSpecial(ev: EventItem) {
  return ev.kind === "商店主" || ev.kind === "L&W" || ev.kind === "AO生";
}

function EventChip({
  ev,
  onClick,
  variant,
}: {
  ev: EventItem;
  onClick: (ev: EventItem) => void;
  variant: Variant;
}) {
  const r = remaining(ev);
  const status = statusOf(ev);
  const colors = baseColorTokens(ev.base);
  const special = isSpecial(ev);

  return (
    <button
      className={`event-chip ${variant} ${special ? "is-seminar" : ""} ${status}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(ev);
      }}
      style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}
    >
      <span className="chip-dot" style={{ background: colors.dot }} />
      <span className="chip-body">
        <span className="chip-title">
          {special && <span className="chip-badge-seminar">{ev.kind}</span>}
          {ev.title}
        </span>
        {ev.teacher && <span className="chip-teacher">講師：{ev.teacher}</span>}
        <span className="chip-meta">
          <span className="chip-time">{ev.time.replace("–", "-")}</span>
          {status === "full" ? (
            <span className="chip-full">満席</span>
          ) : status === "few" ? (
            <span className="chip-few">残{r}</span>
          ) : (
            <span className="chip-open">
              残{r}/{ev.capacity}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

function DayCell({
  cell,
  events,
  onOpenEvent,
  variant,
}: {
  cell: NonNullable<MonthCell>;
  events: EventItem[];
  onOpenEvent: (ev: EventItem) => void;
  variant: Variant;
}) {
  const { year, month, day, weekday } = cell;
  const isSun = weekday === 0;
  const isSat = weekday === 6;
  const today = new Date();
  const isToday =
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day;

  return (
    <div className={`day-cell ${isSat ? "sat" : ""} ${isSun ? "sun" : ""} ${isToday ? "today" : ""}`}>
      <div className="day-number">
        <span className="day-num">{day}</span>
        {isToday && <span className="today-dot">本日</span>}
      </div>
      <div className="day-events">
        {events.map((ev) => (
          <EventChip key={ev.id} ev={ev} onClick={onOpenEvent} variant={variant} />
        ))}
      </div>
    </div>
  );
}

function MonthGrid({
  year,
  month,
  all,
  onOpenEvent,
  variant,
}: {
  year: number;
  month: number;
  all: EventItem[];
  onOpenEvent: (ev: EventItem) => void;
  variant: Variant;
}) {
  const { cells } = useMemo(() => buildMonth(year, month), [year, month]);
  return (
    <div className="month-grid">
      {WEEKDAYS_JA.map((w, i) => (
        <div
          key={w}
          className={`weekday-header ${i === 0 ? "sun" : ""} ${i === 6 ? "sat" : ""}`}
        >
          {w}
        </div>
      ))}
      {cells.map((c, i) =>
        c ? (
          <DayCell
            key={i}
            cell={c}
            events={eventsForDate(all, c.year, c.month, c.day)}
            onOpenEvent={onOpenEvent}
            variant={variant}
          />
        ) : (
          <div key={i} className="day-cell empty" />
        ),
      )}
    </div>
  );
}

function EventDetailModal({
  ev,
  onClose,
}: {
  ev: EventItem;
  onClose: () => void;
}) {
  const r = remaining(ev);
  const status = statusOf(ev);
  const bcls = baseClass(ev.base);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const [y, m, d] = ev.date.split("-").map(Number);
  const wd = new Date(y, m - 1, d).getDay();
  const formUrl = buildFormUrl(ev);

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header ${bcls}`}>
          <div className="modal-base-tag">
            <span className="modal-base-dot" />
            {ev.baseName}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-date">
            <span className="modal-date-m">{m}月</span>
            <span className="modal-date-d">{d}</span>
            <span className="modal-date-w">({WEEKDAYS_JA[wd]})</span>
          </div>
          <h2 className="modal-title">
            {isSpecial(ev) && <span className="modal-badge-seminar">{ev.kind}</span>}
            {ev.title}
          </h2>
          {ev.subtitle && <p className="modal-subtitle">{ev.subtitle}</p>}

          <dl className="modal-info">
            <div>
              <dt>講師</dt>
              <dd>{ev.teacher || <span style={{ color: "#9CA3AF" }}>（未設定）</span>}</dd>
            </div>
            <div>
              <dt>時間</dt>
              <dd>{ev.time}</dd>
            </div>
            <div>
              <dt>会場</dt>
              <dd>{ev.address}</dd>
            </div>
            <div>
              <dt>定員</dt>
              <dd>{ev.capacity}名</dd>
            </div>
            {ev.notes && (
              <div>
                <dt>メモ</dt>
                <dd>{ev.notes}</dd>
              </div>
            )}
          </dl>

          <div className="modal-availability">
            <div className="avail-bar">
              <div
                className="avail-fill"
                style={{ width: `${(ev.booked / ev.capacity) * 100}%` }}
              />
            </div>
            <div className="avail-text">
              {status === "full" ? (
                <span className="avail-full">満席</span>
              ) : status === "few" ? (
                <span className="avail-few">残り{r}枠（まもなく満席）</span>
              ) : (
                <span className="avail-open">
                  残り{r}枠 / 定員{ev.capacity}名
                </span>
              )}
            </div>
          </div>

          <div className="modal-booking" style={{ display: "flex", gap: 8 }}>
            <a
              className={`btn-reserve ${bcls}`}
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
            >
              予約する
            </a>
            <a
              className="btn-secondary"
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textAlign: "center", textDecoration: "none" }}
            >
              取消する
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

type Period = { year: number; month: number };

const PERIODS: Period[] = [
  { year: 2026, month: 4 },
  { year: 2026, month: 5 },
  { year: 2026, month: 6 },
  { year: 2026, month: 7 },
  { year: 2026, month: 8 },
  { year: 2026, month: 9 },
  { year: 2026, month: 10 },
  { year: 2026, month: 11 },
  { year: 2026, month: 12 },
  { year: 2027, month: 1 },
  { year: 2027, month: 2 },
  { year: 2027, month: 3 },
];

function periodKey(p: Period) {
  return `${p.year}-${p.month}`;
}

export default function Calendar() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<Period>({ year: 2026, month: 5 });
  const [variant, setVariant] = useState<Variant>("soft");
  const [openEvent, setOpenEvent] = useState<EventItem | null>(null);
  const [all, setAll] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("evcal.period");
    if (saved) {
      const match = PERIODS.find((p) => periodKey(p) === saved);
      if (match) setSelected(match);
    }
    const v = localStorage.getItem("evcal.variant");
    if (v === "soft" || v === "compact" || v === "bold") setVariant(v);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("evcal.period", periodKey(selected));
  }, [selected, mounted]);
  useEffect(() => {
    if (mounted) localStorage.setItem("evcal.variant", variant);
  }, [variant, mounted]);

  useEffect(() => {
    let active = true;
    loadAllEvents().then((data) => {
      if (active) {
        setAll(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const { year, month: selectedMonth } = selected;

  const stats = useMemo(() => {
    if (!mounted) return { total: 0, seats: 0, booked: 0 };
    const { cells } = buildMonth(year, selectedMonth);
    let total = 0;
    let seats = 0;
    let booked = 0;
    cells.forEach((c) => {
      if (!c) return;
      const evs = eventsForDate(all, c.year, c.month, c.day);
      total += evs.length;
      evs.forEach((e) => {
        seats += e.capacity;
        booked += e.booked;
      });
    });
    return { total, seats, booked };
  }, [year, selectedMonth, mounted, all]);

  const handleOpen = useCallback((ev: EventItem) => setOpenEvent(ev), []);

  return (
    <div className={`app variant-${variant}`}>
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">枠</div>
          <div>
            <h1 className="brand-title">イベント枠カレンダー</h1>
            <div className="brand-sub">2BASE＋DX LABの定例イベント・予約状況</div>
          </div>
        </div>

        <div className="header-right">
          <div className="legend">
            <span className="legend-pill y">
              <span className="d" />
              横須賀BASE
            </span>
            <span className="legend-pill k">
              <span className="d" />
              港南台BASE
            </span>
            <span className="legend-pill dx">
              <span className="d" />
              DX LAB（オンライン）
            </span>
          </div>
        </div>
      </header>

      <div className="month-tabs">
        {PERIODS.map((p) => {
          const isActive = p.year === selected.year && p.month === selected.month;
          return (
            <button
              key={periodKey(p)}
              className={`month-tab ${isActive ? "active" : ""}`}
              onClick={() => setSelected(p)}
            >
              <span className="t-year">{p.year}</span>
              <span>
                <span className="m-num">{p.month}</span>
                <span className="t-label">月</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="month-header">
        <h2 className="month-title">
          <span className="y-big">{year}</span>
          <span className="m-big">{selectedMonth}</span>
          <span className="m-label">月</span>
        </h2>
        <div className="month-stats">
          <span>
            イベント数 <b>{stats.total}</b>
          </span>
          <span>
            総定員 <b>{stats.seats}</b>
          </span>
          <span>
            予約済 <b>{stats.booked}</b>
          </span>
          <span>
            残 <b>{stats.seats - stats.booked}</b>
          </span>
        </div>
      </div>

      <div className="calendar-shell">
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>
            読み込み中…
          </div>
        ) : (
          <MonthGrid
            year={year}
            month={selectedMonth}
            all={all}
            variant={variant}
            onOpenEvent={handleOpen}
          />
        )}
      </div>

      <div className="info-row">
        <div className="info-card y">
          <div className="ic-mark">横</div>
          <div>
            <h4>横須賀BASE</h4>
            <div className="ic-meta">
              横須賀市大津町1-22-22 SLMC横須賀BASE
              <br />
              お申し込み 046-825-5558（10:30–19:00 ※店休日を除く）
            </div>
          </div>
        </div>
        <div className="info-card k">
          <div className="ic-mark">港</div>
          <div>
            <h4>港南台BASE（SLA港南台校）</h4>
            <div className="ic-meta">
              横浜市港南区港南台4-24-2 SLMC港南台BASE
              <br />
              開館 10:30–19:00 ／ 休館 水曜
              <br />
              お申し込み 045-352-7635
            </div>
          </div>
        </div>
        <div className="info-card dx">
          <div className="ic-mark">DX</div>
          <div>
            <h4>DX LAB（オンライン）</h4>
            <div className="ic-meta">
              開催形式：オンライン
              <br />
              2026年4月〜2027年3月の年間スケジュール
            </div>
          </div>
        </div>
      </div>

      <div className="variant-switch">
        <span className="variant-switch-label">デザイン</span>
        {(["soft", "compact", "bold"] as Variant[]).map((v) => (
          <button
            key={v}
            className={`variant-opt ${variant === v ? "active" : ""}`}
            onClick={() => setVariant(v)}
          >
            {v === "soft" ? "親しみ" : v === "compact" ? "コンパクト" : "ボールド"}
          </button>
        ))}
      </div>

      {openEvent && <EventDetailModal ev={openEvent} onClose={() => setOpenEvent(null)} />}
    </div>
  );
}
