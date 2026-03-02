"use client";

interface ChangeItem {
  category: "bug" | "types" | "pattern" | "a11y" | "ux";
  title: string;
  description: string;
}

interface ExercisePageProps {
  number: string;
  title: string;
  time: string;
  scenario: string;
  changes: ChangeItem[];
  beforeSlot: React.ReactNode;
  afterSlot: React.ReactNode;
  layout?: "split" | "stacked";
}

const CATEGORY_LABELS: Record<ChangeItem["category"], { label: string; color: string }> = {
  bug: { label: "Bug Fix", color: "#ef4444" },
  types: { label: "Type Safety", color: "#f59e0b" },
  pattern: { label: "React Pattern", color: "#f97316" },
  a11y: { label: "Accessibility", color: "#3b82f6" },
  ux: { label: "UX", color: "#a855f7" },
};

export default function ExercisePage({
  number,
  title,
  time,
  scenario,
  changes,
  beforeSlot,
  afterSlot,
  layout = "split",
}: ExercisePageProps) {
  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <div className="label" style={{ marginBottom: 12 }}>
          Exercise {number} · {time}
        </div>
        <h1>{title}</h1>
        <p className="exercise-page__scenario">{scenario}</p>
      </header>

      <div className={`exercise-page__split ${layout === "stacked" ? "exercise-page__split--stacked" : ""}`}>
        <div className="exercise-page__panel exercise-page__panel--before">
          <div className="exercise-page__panel-header">
            <span className="exercise-page__panel-badge exercise-page__panel-badge--before">
              Before
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
              exercises/{number.padStart(2, "0")}-*
            </span>
          </div>
          <div className="exercise-page__panel-content">
            {beforeSlot}
          </div>
        </div>

        <div className="exercise-page__panel exercise-page__panel--after">
          <div className="exercise-page__panel-header">
            <span className="exercise-page__panel-badge exercise-page__panel-badge--after">
              After
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
              solutions/{number.padStart(2, "0")}-*
            </span>
          </div>
          <div className="exercise-page__panel-content p-lg">
            {afterSlot}
          </div>
        </div>
      </div>

      <section className="exercise-page__changes">
        <h2>What I Changed & Why</h2>
        <div className="changes-grid">
          {changes.map((change, i) => {
            const cat = CATEGORY_LABELS[change.category];
            return (
              <div key={i} className="change-card">
                <span
                  className="change-card__badge"
                  style={{ color: cat.color, borderColor: cat.color }}
                >
                  {cat.label}
                </span>
                <h3 className="change-card__title">{change.title}</h3>
                <p className="change-card__description">{change.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}