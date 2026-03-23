import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";

const CommandPalette = ({ dark, onClose, setActive }) => {
  const [q, setQ] = useState("");
  const ref = useRef();

  useEffect(() => { ref.current?.focus(); }, []);

  const cmds = [
    { label: "Go to Dashboard",   icon: "dashboard", action: "dashboard" },
    { label: "Open AI Chat",      icon: "chat",      action: "chat"      },
    { label: "Manage Tasks",      icon: "tasks",     action: "tasks"     },
    { label: "View Notes",        icon: "notes",     action: "notes"     },
    { label: "Analytics",         icon: "analytics", action: "analytics" },
    { label: "Profile Settings",  icon: "profile",   action: "profile"   },
  ].filter((c) => !q || c.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: 120,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          background: dark ? "#141416" : "#fff",
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${dark ? "#222" : "#eee"}`,
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 18px",
            borderBottom: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`,
          }}
        >
          <Icon name="cmd" size={16} />
          <input
            ref={ref}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: 15, color: dark ? "#e0e0e0" : "#111",
            }}
          />
          <kbd style={{ fontSize: 11, color: dark ? "#444" : "#bbb", background: dark ? "#1e1e22" : "#f5f5f5", padding: "2px 6px", borderRadius: 5 }}>
            Esc
          </kbd>
        </div>

        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {cmds.map((c, i) => (
            <button
              key={i}
              onClick={() => { setActive(c.action); onClose(); }}
              onMouseEnter={(e) => (e.currentTarget.style.background = dark ? "#1a1a1e" : "#f8f8ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 18px",
                background: "transparent", border: "none", cursor: "pointer",
                color: dark ? "#ccc" : "#333", fontSize: 14, textAlign: "left",
                borderBottom: `1px solid ${dark ? "#1a1a1c" : "#fafafa"}`,
              }}
            >
              <Icon name={c.icon} size={16} />
              {c.label}
            </button>
          ))}
          {cmds.length === 0 && (
            <div style={{ padding: "20px 18px", color: dark ? "#444" : "#aaa", fontSize: 13 }}>
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
