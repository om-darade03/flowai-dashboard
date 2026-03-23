import Icon from "./Icon";
import { getInitials } from "../utils/helpers";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "chat",      label: "AI Chat",   icon: "chat"      },
  { id: "tasks",     label: "Tasks",     icon: "tasks"     },
  { id: "notes",     label: "Notes",     icon: "notes"     },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "profile",   label: "Profile",   icon: "profile"   },
];

const Sidebar = ({ active, setActive, dark, collapsed, setCollapsed, userName }) => (
  <aside
    style={{
      width: collapsed ? 64 : 220,
      minHeight: "100vh",
      background: dark ? "#0f0f10" : "#ffffff",
      borderRight: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`,
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s ease",
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    {/* Logo */}
    <div style={{ padding: "20px 16px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="#fff" stroke="none">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        </svg>
      </div>
      {!collapsed && (
        <span style={{ fontWeight: 700, fontSize: 15, color: dark ? "#fff" : "#0f0f10", letterSpacing: "-0.3px" }}>
          FlowAI
        </span>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: dark ? "#555" : "#aaa", padding: 0, display: "flex" }}
      >
        <Icon name="menu" size={16} />
      </button>
    </div>

    {!collapsed && (
      <div style={{ padding: "0 12px 12px", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: dark ? "#333" : "#bbb", fontWeight: 600 }}>
        NAVIGATION
      </div>
    )}

    {/* Nav items */}
    <nav style={{ flex: 1, padding: "0 8px" }}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: active === item.id ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
            color: active === item.id ? "#fff" : dark ? "#666" : "#888",
            marginBottom: 2,
            transition: "all 0.15s",
            justifyContent: collapsed ? "center" : "flex-start",
            fontSize: 13,
            fontWeight: active === item.id ? 600 : 400,
          }}
        >
          <Icon name={item.icon} size={17} />
          {!collapsed && <span>{item.label}</span>}
        </button>
      ))}
    </nav>

    {/* User section */}
    <div style={{ padding: "12px 8px 20px", borderTop: `1px solid ${dark ? "#1a1a1e" : "#f5f5f5"}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.5px",
          }}
        >
          {getInitials(userName)}
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#ccc" : "#333", whiteSpace: "nowrap" }}>
              {userName || "User"}
            </div>
            <div style={{ fontSize: 11, color: dark ? "#444" : "#aaa" }}>Pro Plan</div>
          </div>
        )}
      </div>
    </div>
  </aside>
);

export default Sidebar;
