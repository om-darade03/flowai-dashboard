import { useState } from "react";
import Icon from "../components/Icon";
import { uid } from "../utils/helpers";

const PRIORITY_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
const COL_COLORS      = { todo: "#6366f1", progress: "#f59e0b", done: "#10b981" };
const COL_LABELS      = { todo: "To Do", progress: "In Progress", done: "Done" };

const TasksPage = ({ dark, tasks, setTasks, addToast }) => {
  const [modal,    setModal]    = useState(null);
  const [form,     setForm]     = useState({ title: "", priority: "medium", tag: "Dev", col: "todo" });
  const [dragInfo, setDragInfo] = useState(null);

  const addTask = () => {
    if (!form.title.trim()) return;
    setTasks((t) => ({ ...t, [form.col]: [...t[form.col], { id: uid(), title: form.title, priority: form.priority, tag: form.tag }] }));
    setModal(null);
    setForm({ title: "", priority: "medium", tag: "Dev", col: "todo" });
    addToast("Task added!", "success");
  };

  const removeTask = (col, id) => {
    setTasks((t) => ({ ...t, [col]: t[col].filter((x) => x.id !== id) }));
    addToast("Task removed", "info");
  };

  const onDragStart = (col, id) => setDragInfo({ col, id });
  const onDrop = (targetCol) => {
    if (!dragInfo || dragInfo.col === targetCol) { setDragInfo(null); return; }
    const task = tasks[dragInfo.col].find((x) => x.id === dragInfo.id);
    setTasks((t) => ({
      ...t,
      [dragInfo.col]: t[dragInfo.col].filter((x) => x.id !== dragInfo.id),
      [targetCol]: [...t[targetCol], task],
    }));
    setDragInfo(null);
    addToast(`Moved to ${COL_LABELS[targetCol]}`, "success");
  };

  const inputStyle = (dark) => ({
    width: "100%", padding: "9px 12px", borderRadius: 9, fontSize: 13,
    border: `1px solid ${dark ? "#222" : "#eee"}`,
    background: dark ? "#0f0f11" : "#fafafa",
    color: dark ? "#ccc" : "#333", outline: "none", boxSizing: "border-box",
  });

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dark ? "#ccc" : "#333" }}>Kanban Board</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: dark ? "#444" : "#aaa" }}>Drag and drop tasks between columns</p>
        </div>
        <button
          onClick={() => setModal("add")}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
        >
          <Icon name="plus" size={15} /> Add Task
        </button>
      </div>

      {/* Kanban columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {Object.keys(COL_LABELS).map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(col)}
            style={{ background: dark ? "#141416" : "#fafafa", border: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`, borderRadius: 14, padding: 14, minHeight: 300 }}
          >
            {/* Column header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COL_COLORS[col] }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: dark ? "#aaa" : "#555" }}>{COL_LABELS[col]}</span>
              <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: dark ? "#1e1e22" : "#f0f0f0", color: dark ? "#555" : "#aaa" }}>
                {tasks[col].length}
              </span>
            </div>

            {/* Task cards */}
            {tasks[col].map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => onDragStart(col, task.id)}
                style={{ background: dark ? "#0f0f11" : "#fff", border: `1px solid ${dark ? "#1a1a1e" : "#eee"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "grab" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: dark ? "#bbb" : "#333", lineHeight: 1.4 }}>{task.title}</span>
                  <button onClick={() => removeTask(col, task.id)} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#333" : "#ddd", flexShrink: 0, padding: 0 }}>
                    <Icon name="trash" size={13} />
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, fontWeight: 600, background: `${PRIORITY_COLORS[task.priority]}20`, color: PRIORITY_COLORS[task.priority] }}>
                    {task.priority}
                  </span>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: dark ? "#1e1e22" : "#f5f5f5", color: dark ? "#555" : "#aaa" }}>
                    {task.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Add task modal */}
      {modal === "add" && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 400, background: dark ? "#141416" : "#fff", borderRadius: 16, padding: 24, border: `1px solid ${dark ? "#222" : "#eee"}` }}>
            <h3 style={{ margin: "0 0 18px", color: dark ? "#e0e0e0" : "#111", fontSize: 15, fontWeight: 700 }}>Add New Task</h3>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: dark ? "#555" : "#aaa", display: "block", marginBottom: 6 }}>Title</label>
              <input value={form.title} onChange={(e) => setForm((x) => ({ ...x, title: e.target.value }))} placeholder="Task title..." style={inputStyle(dark)} />
            </div>

            {[
              { label: "Priority", key: "priority", opts: ["low", "medium", "high"] },
              { label: "Column",   key: "col",      opts: Object.keys(COL_LABELS)   },
              { label: "Tag",      key: "tag",      opts: ["Dev", "Design", "Research", "Work"] },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: dark ? "#555" : "#aaa", display: "block", marginBottom: 6 }}>{f.label}</label>
                <select value={form[f.key]} onChange={(e) => setForm((x) => ({ ...x, [f.key]: e.target.value }))} style={inputStyle(dark)}>
                  {f.opts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: `1px solid ${dark ? "#222" : "#eee"}`, background: "none", color: dark ? "#555" : "#aaa", cursor: "pointer", fontSize: 13 }}>Cancel</button>
              <button onClick={addTask} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
