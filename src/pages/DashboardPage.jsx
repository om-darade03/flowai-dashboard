import { today } from "../utils/helpers";

const DashboardPage = ({ dark, tasks, notes, addToast, setActive, userName }) => {
  const total = Object.values(tasks).flat().length;
  const done = tasks.done.length;
  const score = total > 0 ? Math.round((done / total) * 100) : 0;

  const stats = [
    { label: "Tasks Completed", value: done,                   icon: "check",  color: "#10b981", bg: "#d1fae5" },
    { label: "In Progress",     value: tasks.progress.length,  icon: "clock",  color: "#6366f1", bg: "#e0e7ff" },
    { label: "Productivity",    value: `${score}%`,            icon: "target", color: "#f59e0b", bg: "#fef3c7" },
    { label: "Notes",           value: notes.length,           icon: "notes",  color: "#ec4899", bg: "#fce7f3" },
  ];

  const card = {
    background: dark ? "#141416" : "#fff",
    border: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`,
    borderRadius: 14,
  };

  return (
    <div style={{ padding: 28, maxWidth: 1100 }}>
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: dark ? "#f0f0f0" : "#111", letterSpacing: "-0.4px" }}>
          Good morning, {userName ? userName.split(" ")[0] : "there"} 👋
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: dark ? "#555" : "#aaa" }}>{today()}</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, padding: "18px 20px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {s.icon === "check"  && <path d="M20 6L9 17l-5-5" />}
                {s.icon === "clock"  && <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>}
                {s.icon === "target" && <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>}
                {s.icon === "notes"  && <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 7H7m7 4H7m3-8H7" />}
              </svg>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: dark ? "#e8e8e8" : "#111", letterSpacing: "-0.5px" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: dark ? "#444" : "#aaa", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent tasks + notes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ ...card, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>Recent Tasks</h3>
            <button onClick={() => setActive("tasks")} style={{ background: "none", border: "none", color: "#6366f1", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>View all →</button>
          </div>
          {[...tasks.todo, ...tasks.progress].slice(0, 4).map((t) => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${dark ? "#1a1a1c" : "#fafafa"}` }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.priority === "high" ? "#ef4444" : t.priority === "medium" ? "#f59e0b" : "#10b981", flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: dark ? "#aaa" : "#444" }}>{t.title}</span>
              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 6, background: dark ? "#1e1e22" : "#f5f5f5", color: dark ? "#555" : "#999" }}>{t.tag}</span>
            </div>
          ))}
        </div>

        <div style={{ ...card, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>Recent Notes</h3>
            <button onClick={() => setActive("notes")} style={{ background: "none", border: "none", color: "#6366f1", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>View all →</button>
          </div>
          {notes.slice(0, 3).map((n) => (
            <div key={n.id} style={{ padding: "9px 0", borderBottom: `1px solid ${dark ? "#1a1a1c" : "#fafafa"}` }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: dark ? "#bbb" : "#333", marginBottom: 2 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: dark ? "#444" : "#aaa" }}>{n.updatedAt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Productivity bar */}
      <div style={{ ...card, padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>Overall Productivity</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#6366f1" }}>{score}%</span>
        </div>
        <div style={{ height: 8, background: dark ? "#1e1e22" : "#f5f5f5", borderRadius: 8 }}>
          <div style={{ height: "100%", width: `${score}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 8, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 11, color: dark ? "#444" : "#bbb" }}>{done} tasks done</span>
          <span style={{ fontSize: 11, color: dark ? "#444" : "#bbb" }}>{total - done} remaining</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
