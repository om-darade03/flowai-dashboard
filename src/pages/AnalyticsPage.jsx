const AnalyticsPage = ({ dark, tasks }) => {
  const total    = Object.values(tasks).flat().length;
  const done     = tasks.done.length;
  const progress = tasks.progress.length;
  const todo     = tasks.todo.length;

  const weekData = [
    { day: "Mon", tasks: 3, score: 65 },
    { day: "Tue", tasks: 5, score: 80 },
    { day: "Wed", tasks: 2, score: 55 },
    { day: "Thu", tasks: 7, score: 90 },
    { day: "Fri", tasks: 4, score: 72 },
    { day: "Sat", tasks: 1, score: 45 },
    { day: "Sun", tasks: 6, score: 88 },
  ];
  const maxTasks = Math.max(...weekData.map((d) => d.tasks));

  const card = {
    background: dark ? "#141416" : "#fff",
    border: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`,
    borderRadius: 14,
    padding: "20px 22px",
  };

  return (
    <div style={{ padding: 28, maxWidth: 900 }}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Completion Rate", value: `${total > 0 ? Math.round((done / total) * 100) : 0}%`, sub: `${done}/${total} tasks`,    color: "#6366f1" },
          { label: "This Week",       value: "22",   sub: "tasks completed",       color: "#10b981" },
          { label: "Avg Daily Score", value: "71%",  sub: "+8% from last week",    color: "#f59e0b" },
        ].map((c, i) => (
          <div key={i} style={card}>
            <div style={{ fontSize: 12, color: dark ? "#444" : "#aaa", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.color, letterSpacing: "-0.5px" }}>{c.value}</div>
            <div style={{ fontSize: 11, color: dark ? "#333" : "#bbb", marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Distribution + bar chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Task distribution */}
        <div style={card}>
          <h3 style={{ margin: "0 0 18px", fontSize: 14, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>Task Distribution</h3>
          {[
            { label: "To Do",       count: todo,     color: "#6366f1" },
            { label: "In Progress", count: progress, color: "#f59e0b" },
            { label: "Done",        count: done,     color: "#10b981" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: dark ? "#aaa" : "#555" }}>{item.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: dark ? "#888" : "#333" }}>{item.count}</span>
              </div>
              <div style={{ height: 6, background: dark ? "#1e1e22" : "#f5f5f5", borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${total > 0 ? (item.count / total) * 100 : 0}%`, background: item.color, borderRadius: 4, transition: "width 0.5s ease" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly bar chart */}
        <div style={card}>
          <h3 style={{ margin: "0 0 18px", fontSize: 14, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>Weekly Tasks</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {weekData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", background: dark ? "#1e1e22" : "#f5f5f5", borderRadius: 5, height: 100, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", background: "linear-gradient(180deg, #6366f1, #8b5cf6)", borderRadius: 5, height: `${(d.tasks / maxTasks) * 100}%`, transition: "height 0.5s ease" }} />
                </div>
                <span style={{ fontSize: 9, color: dark ? "#333" : "#bbb" }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score trend SVG line chart */}
      <div style={card}>
        <h3 style={{ margin: "0 0 18px", fontSize: 14, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>Productivity Score Trend</h3>
        <svg viewBox="0 0 700 80" width="100%" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"   />
            </linearGradient>
          </defs>
          {(() => {
            const pts  = weekData.map((d, i) => ({ x: i * (700 / 6), y: 80 - (d.score / 100) * 70 }));
            const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
            const area = `${line} L ${pts[pts.length - 1].x} 80 L 0 80 Z`;
            return (
              <>
                <path d={area} fill="url(#areaGrad)" />
                <path d={line} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366f1" />)}
              </>
            );
          })()}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {weekData.map((d) => <span key={d.day} style={{ fontSize: 10, color: dark ? "#333" : "#bbb" }}>{d.day}</span>)}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
