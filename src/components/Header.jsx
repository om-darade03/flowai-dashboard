import Icon from "./Icon";

const Header = ({ title, subtitle, dark, setDark, addToast, setCmd }) => (
  <header
    style={{
      padding: "16px 28px",
      display: "flex",
      alignItems: "center",
      background: dark ? "#0a0a0b" : "#fafafa",
      borderBottom: `1px solid ${dark ? "#1a1a1e" : "#f0f0f0"}`,
      gap: 16,
    }}
  >
    <div style={{ flex: 1 }}>
      <h1
        style={{
          margin: 0,
          fontSize: 18,
          fontWeight: 700,
          color: dark ? "#f0f0f0" : "#111",
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ margin: 0, fontSize: 12, color: dark ? "#444" : "#aaa", marginTop: 1 }}>
          {subtitle}
        </p>
      )}
    </div>

    {/* Command palette trigger */}
    <button
      onClick={() => setCmd(true)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        background: dark ? "#141416" : "#f5f5f5",
        border: `1px solid ${dark ? "#222" : "#eee"}`,
        borderRadius: 10,
        cursor: "pointer",
        color: dark ? "#444" : "#aaa",
        fontSize: 13,
      }}
    >
      <Icon name="search" size={14} />
      <span style={{ fontSize: 12 }}>Search... ⌘K</span>
    </button>

    <button
      onClick={() => addToast("No new notifications", "info")}
      style={{
        background: "none",
        border: `1px solid ${dark ? "#222" : "#eee"}`,
        borderRadius: 10,
        padding: "7px 10px",
        cursor: "pointer",
        color: dark ? "#555" : "#999",
        display: "flex",
      }}
    >
      <Icon name="bell" size={16} />
    </button>

    <button
      onClick={() => setDark(!dark)}
      style={{
        background: dark ? "#1a1a1e" : "#f0f0f0",
        border: "none",
        borderRadius: 10,
        padding: "7px 10px",
        cursor: "pointer",
        color: dark ? "#aaa" : "#666",
        display: "flex",
      }}
    >
      <Icon name={dark ? "sun" : "moon"} size={16} />
    </button>
  </header>
);

export default Header;
