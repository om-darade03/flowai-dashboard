import { useState, useRef } from "react";
import Icon from "../components/Icon";
import { uid } from "../utils/helpers";

const NotesPage = ({ dark, notes, setNotes, addToast }) => {
  const [activeId,  setActiveId]  = useState(notes[0]?.id || null);
  const [editTitle, setEditTitle] = useState(false);
  const autoSaveRef               = useRef(null);

  const activeNote = notes.find((n) => n.id === activeId);

  const updateNote = (field, value) => {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    setNotes((ns) => ns.map((n) => n.id === activeId ? { ...n, [field]: value, updatedAt: "Just now" } : n));
    autoSaveRef.current = setTimeout(() => addToast("Auto-saved", "success"), 1500);
  };

  const newNote = () => {
    const n = { id: uid(), title: "Untitled Note", content: "", updatedAt: "Just now" };
    setNotes((ns) => [n, ...ns]);
    setActiveId(n.id);
  };

  const deleteNote = (id) => {
    setNotes((ns) => ns.filter((n) => n.id !== id));
    if (activeId === id) setActiveId(notes.find((n) => n.id !== id)?.id || null);
    addToast("Note deleted", "info");
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
      {/* Note list */}
      <div style={{ width: 240, borderRight: `1px solid ${dark ? "#1a1a1e" : "#f0f0f0"}`, background: dark ? "#0c0c0d" : "#fafafa", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 14px" }}>
          <button
            onClick={newNote}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 9, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
          >
            <Icon name="plus" size={14} /> New Note
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 16px" }}>
          {notes.map((n) => (
            <div
              key={n.id}
              onClick={() => setActiveId(n.id)}
              style={{ padding: "10px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 2, background: activeId === n.id ? (dark ? "#1a1a22" : "#eff0ff") : "transparent", position: "relative" }}
            >
              <div style={{ fontSize: 13, fontWeight: 500, color: dark ? "#bbb" : "#333", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.title}</div>
              <div style={{ fontSize: 11, color: dark ? "#333" : "#bbb" }}>{n.updatedAt}</div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteNote(n.id); }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: dark ? "#555" : "#ccc", padding: 0, opacity: 0 }}
              >
                <Icon name="trash" size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {activeNote ? (
          <>
            <div style={{ padding: "16px 28px", borderBottom: `1px solid ${dark ? "#1a1a1e" : "#f0f0f0"}`, display: "flex", alignItems: "center", gap: 12 }}>
              {editTitle ? (
                <input
                  value={activeNote.title}
                  onChange={(e) => updateNote("title", e.target.value)}
                  onBlur={() => setEditTitle(false)}
                  autoFocus
                  style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 18, fontWeight: 700, color: dark ? "#e0e0e0" : "#111" }}
                />
              ) : (
                <h2 onClick={() => setEditTitle(true)} style={{ flex: 1, margin: 0, fontSize: 18, fontWeight: 700, color: dark ? "#e0e0e0" : "#111", cursor: "text" }}>
                  {activeNote.title}
                </h2>
              )}
              <span style={{ fontSize: 11, color: dark ? "#333" : "#bbb" }}>Auto-save enabled · {activeNote.updatedAt}</span>
            </div>

            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote("content", e.target.value)}
              placeholder="Start writing your note…"
              style={{ flex: 1, padding: "24px 28px", background: dark ? "#0a0a0b" : "#fff", border: "none", outline: "none", resize: "none", fontSize: 14, color: dark ? "#aaa" : "#444", lineHeight: 1.8, fontFamily: "inherit" }}
            />
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: dark ? "#333" : "#ccc", fontSize: 14 }}>
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
