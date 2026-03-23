import Icon from "./Icon";

const Toast = ({ toasts, removeToast }) => (
  <div
    style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    {toasts.map((t) => (
      <div
        key={t.id}
        style={{
          background:
            t.type === "success"
              ? "#10b981"
              : t.type === "error"
              ? "#ef4444"
              : "#6366f1",
          color: "#fff",
          padding: "12px 18px",
          borderRadius: 12,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 10,
          minWidth: 200,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease",
        }}
      >
        <span style={{ flex: 1 }}>{t.msg}</span>
        <button
          onClick={() => removeToast(t.id)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Icon name="close" size={14} />
        </button>
      </div>
    ))}
  </div>
);

export default Toast;
