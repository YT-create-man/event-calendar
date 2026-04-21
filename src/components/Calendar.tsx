"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildMonth,
  eventsForDate,
  remaining,
  resetAllEdits,
  resetEvent,
  statusOf,
  updateEvent,
  WEEKDAYS_JA,
  type EventItem,
  type MonthCell,
} from "@/lib/data";

type Variant = "soft" | "compact" | "bold";

function EventChip({
  ev,
  onClick,
  variant,
  editMode,
}: {
  ev: EventItem;
  onClick: (ev: EventItem) => void;
  variant: Variant;
  editMode: boolean;
}) {
  const r = remaining(ev);
  const status = statusOf(ev);
  const isYoko = ev.base === "yokosuka";
  const isSeminar = ev.kind === "seminar";

  const colors = isYoko
    ? {
        bg: "var(--y-bg)",
        border: "var(--y-border)",
        text: "var(--y-text)",
        dot: "var(--y-dot)",
      }
    : {
        bg: "var(--k-bg)",
        border: "var(--k-border)",
        text: "var(--k-text)",
        dot: "var(--k-dot)",
      };

  return (
    <button
      className={`event-chip ${variant} ${isSeminar ? "is-seminar" : ""} ${status} ${editMode ? "is-edit" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(ev);
      }}
      style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}
    >
      <span className="chip-dot" style={{ background: colors.dot }} />
      <span className="chip-body">
        <span className="chip-title">
          {isSeminar && <span className="chip-badge-seminar">特別</span>}
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
      {editMode && <span className="chip-edit-badge">✎</span>}
    </button>
  );
}

function DayCell({
  cell,
  onOpenEvent,
  variant,
  editMode,
  tick,
}: {
  cell: NonNullable<MonthCell>;
  onOpenEvent: (ev: EventItem) => void;
  variant: Variant;
  editMode: boolean;
  tick: number;
}) {
  const { year, month, day, weekday } = cell;
  const events = useMemo(
    () => eventsForDate(year, month, day, weekday),
    [year, month, day, weekday, tick],
  );
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
          <EventChip
            key={ev.id}
            ev={ev}
            onClick={onOpenEvent}
            variant={variant}
            editMode={editMode}
          />
        ))}
      </div>
    </div>
  );
}

function MonthGrid({
  year,
  month,
  onOpenEvent,
  variant,
  editMode,
  tick,
}: {
  year: number;
  month: number;
  onOpenEvent: (ev: EventItem) => void;
  variant: Variant;
  editMode: boolean;
  tick: number;
}) {
  const { cells } = useMemo(() => buildMonth(year, month), [year, month]);
  return (
    <div className={`month-grid ${editMode ? "is-edit" : ""}`}>
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
            onOpenEvent={onOpenEvent}
            variant={variant}
            editMode={editMode}
            tick={tick}
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
  onEdit,
}: {
  ev: EventItem;
  onClose: () => void;
  onEdit: (ev: EventItem) => void;
}) {
  const r = remaining(ev);
  const status = statusOf(ev);
  const isYoko = ev.base === "yokosuka";
  const [count, setCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const parts = ev.id.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  const wd = new Date(y, m - 1, d).getDay();

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header ${isYoko ? "y" : "k"}`}>
          <div className="modal-base-tag">
            <span className="modal-base-dot" />
            {ev.baseName}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="modal-edit-btn" onClick={() => onEdit(ev)}>
              ✎ 編集
            </button>
            <button className="modal-close" onClick={onClose} aria-label="閉じる">
              ×
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-date">
            <span className="modal-date-m">{m}月</span>
            <span className="modal-date-d">{d}</span>
            <span className="modal-date-w">({WEEKDAYS_JA[wd]})</span>
          </div>
          <h2 className="modal-title">
            {ev.kind === "seminar" && <span className="modal-badge-seminar">特別企画</span>}
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

          {submitted ? (
            <div className="modal-submitted">
              ご予約ありがとうございます。確認メールをお送りしました。
            </div>
          ) : status !== "full" ? (
            <div className="modal-booking">
              <label>参加人数</label>
              <div className="counter">
                <button onClick={() => setCount(Math.max(1, count - 1))}>−</button>
                <span>{count}名</span>
                <button onClick={() => setCount(Math.min(r, count + 1))}>＋</button>
              </div>
              <button
                className={`btn-reserve ${isYoko ? "y" : "k"}`}
                disabled={submitting}
                onClick={() => {
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitted(true);
                    setSubmitting(false);
                  }, 600);
                }}
              >
                {submitting ? "予約中…" : "この枠を予約する"}
              </button>
            </div>
          ) : (
            <div className="modal-waitlist">
              <button className="btn-waitlist">キャンセル待ちに登録</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EventEditModal({ ev, onClose }: { ev: EventItem; onClose: () => void }) {
  const isYoko = ev.base === "yokosuka";
  const [form, setForm] = useState({
    title: ev.title || "",
    teacher: ev.teacher || "",
    subtitle: ev.subtitle || "",
    time: ev.time || "14:00–16:00",
    capacity: String(ev.capacity ?? 8),
    booked: String(ev.booked ?? 0),
    notes: ev.notes || "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const parts = ev.id.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  const wd = new Date(y, m - 1, d).getDay();

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const cap = Math.max(1, Number(form.capacity) || 1);
    const patch: Partial<EventItem> = {
      title: form.title,
      teacher: form.teacher,
      subtitle: form.subtitle,
      time: form.time,
      notes: form.notes,
      capacity: cap,
      booked: Math.max(0, Math.min(Number(form.booked) || 0, cap)),
    };
    updateEvent(ev.id, patch);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 700);
  };

  const reset = () => {
    if (confirm("このイベントの編集内容を初期値に戻しますか？")) {
      resetEvent(ev.id);
      onClose();
    }
  };

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal-card edit" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header ${isYoko ? "y" : "k"}`}>
          <div className="modal-base-tag">
            <span className="modal-base-dot" />
            <span style={{ fontWeight: 800 }}>編集 · {ev.baseName}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-date" style={{ marginBottom: 14 }}>
            <span className="modal-date-m">{m}月</span>
            <span className="modal-date-d">{d}</span>
            <span className="modal-date-w">({WEEKDAYS_JA[wd]})</span>
          </div>

          <div className="edit-grid">
            <label className="field">
              <span className="field-label">イベント名</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="例：こども造形ワークショップ"
              />
            </label>

            <label className="field">
              <span className="field-label">講師名</span>
              <input
                type="text"
                value={form.teacher}
                onChange={(e) => set("teacher", e.target.value)}
                placeholder="例：山田 あきこ"
              />
            </label>

            <label className="field">
              <span className="field-label">サブタイトル／説明</span>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="例：地域で商いを続けるヒント"
              />
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field-label">時間</span>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  placeholder="14:00–16:00"
                />
              </label>
              <label className="field" style={{ maxWidth: 110 }}>
                <span className="field-label">定員</span>
                <input
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={(e) => set("capacity", e.target.value)}
                />
              </label>
              <label className="field" style={{ maxWidth: 110 }}>
                <span className="field-label">予約済</span>
                <input
                  type="number"
                  min={0}
                  value={form.booked}
                  onChange={(e) => set("booked", e.target.value)}
                />
              </label>
            </div>

            <label className="field">
              <span className="field-label">メモ（内部用）</span>
              <textarea
                value={form.notes}
                rows={3}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="持ち物、注意事項など"
              />
            </label>
          </div>

          <div className="edit-actions">
            <button className="btn-secondary" onClick={reset}>
              初期値に戻す
            </button>
            <div style={{ flex: 1 }} />
            <button className="btn-secondary" onClick={onClose}>
              キャンセル
            </button>
            <button
              className={`btn-reserve ${isYoko ? "y" : "k"}`}
              onClick={save}
              style={{ width: "auto", padding: "12px 22px" }}
            >
              {saved ? "✓ 保存しました" : "保存する"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<5 | 6>(5);
  const [editMode, setEditMode] = useState(false);
  const [variant, setVariant] = useState<Variant>("soft");
  const [openEvent, setOpenEvent] = useState<EventItem | null>(null);
  const [editEvent, setEditEvent] = useState<EventItem | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const m = parseInt(localStorage.getItem("evcal.month") || "5", 10);
    if (m === 5 || m === 6) setSelectedMonth(m);
    setEditMode(localStorage.getItem("evcal.editMode") === "1");
    const v = localStorage.getItem("evcal.variant");
    if (v === "soft" || v === "compact" || v === "bold") setVariant(v);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("evcal.month", String(selectedMonth));
  }, [selectedMonth, mounted]);
  useEffect(() => {
    if (mounted) localStorage.setItem("evcal.variant", variant);
  }, [variant, mounted]);
  useEffect(() => {
    if (mounted) localStorage.setItem("evcal.editMode", editMode ? "1" : "0");
  }, [editMode, mounted]);

  useEffect(() => {
    const h = () => setTick((t) => t + 1);
    window.addEventListener("evcal:updated", h);
    return () => window.removeEventListener("evcal:updated", h);
  }, []);

  const year = 2026;
  const months: Array<5 | 6> = [5, 6];

  const stats = useMemo(() => {
    if (!mounted) return { total: 0, seats: 0, booked: 0 };
    const { cells } = buildMonth(year, selectedMonth);
    let total = 0;
    let seats = 0;
    let booked = 0;
    cells.forEach((c) => {
      if (!c) return;
      const evs = eventsForDate(c.year, c.month, c.day, c.weekday);
      total += evs.length;
      evs.forEach((e) => {
        seats += e.capacity;
        booked += e.booked;
      });
    });
    return { total, seats, booked };
  }, [selectedMonth, tick, mounted]);

  const handleOpen = useCallback(
    (ev: EventItem) => {
      if (editMode) setEditEvent(ev);
      else setOpenEvent(ev);
    },
    [editMode],
  );

  return (
    <div className={`app variant-${variant} ${editMode ? "edit-active" : ""}`}>
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">枠</div>
          <div>
            <h1 className="brand-title">イベント枠カレンダー</h1>
            <div className="brand-sub">2BASEの定例イベント・予約状況 / {year}年</div>
          </div>
        </div>

        <div className="header-right">
          <div className="legend">
            <span className="legend-pill y">
              <span className="d" />
              横須賀BASE（火・土）
            </span>
            <span className="legend-pill k">
              <span className="d" />
              港南台BASE
            </span>
          </div>
          <button
            className={`edit-toggle ${editMode ? "on" : ""}`}
            onClick={() => setEditMode((v) => !v)}
            title={editMode ? "閲覧モードに戻す" : "編集モード：イベントをクリックして編集"}
          >
            <span className="edit-toggle-icon">{editMode ? "✓" : "✎"}</span>
            {editMode ? "編集モード：ON" : "編集モード"}
          </button>
        </div>
      </header>

      {editMode && (
        <div className="edit-banner">
          <span>✎ 編集モード — 各イベントをクリックすると講師名・タイトル・定員などを編集できます</span>
          <button
            className="banner-btn"
            onClick={() => {
              if (confirm("すべての編集内容を初期値に戻しますか？")) resetAllEdits();
            }}
          >
            すべての編集をリセット
          </button>
        </div>
      )}

      <div className="month-tabs">
        {months.map((m) => (
          <button
            key={m}
            className={`month-tab ${selectedMonth === m ? "active" : ""}`}
            onClick={() => setSelectedMonth(m)}
          >
            <span className="m-num">{m}</span>
            <span>月</span>
          </button>
        ))}
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
        <MonthGrid
          year={year}
          month={selectedMonth}
          variant={variant}
          editMode={editMode}
          onOpenEvent={handleOpen}
          tick={tick}
        />
      </div>

      <div className="info-row">
        <div className="info-card y">
          <div className="ic-mark">横</div>
          <div>
            <h4>横須賀BASE</h4>
            <div className="ic-meta">
              毎週 火・土 14:00–16:00（認知症予防講座のみ13:00開始）
              <br />
              横須賀市大津町1-22-22 SLMC横須賀BASE
              <br />
              事前予約制・定員6名（メンバー＆お友達は無料／一般1,000円）
              <br />
              お申し込み 046-825-5558（10:30–19:00 ※店休日を除く）
            </div>
          </div>
        </div>
        <div className="info-card k">
          <div className="ic-mark">港</div>
          <div>
            <h4>港南台BASE</h4>
            <div className="ic-meta">
              14:00–16:00
              <br />
              横浜市港南区港南台3-2 BASE 2F
              <br />
              事前予約制・定員10名
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

      {openEvent && (
        <EventDetailModal
          ev={openEvent}
          onClose={() => setOpenEvent(null)}
          onEdit={(ev) => {
            setOpenEvent(null);
            setEditEvent(ev);
          }}
        />
      )}
      {editEvent && <EventEditModal ev={editEvent} onClose={() => setEditEvent(null)} />}
    </div>
  );
}
