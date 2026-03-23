import { useState } from "react";

const AuthPage = ({ dark, onLogin }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14,
    border: `1px solid ${dark ? "#222" : "#eee"}`,
    background: dark ? "#0f0f11" : "#fafafa",
    color: dark ? "#ccc" : "#333", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "#0a0a0b" : "#f8f8ff", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400, background: dark ? "rgba(15,15,18,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", border: `1px solid ${dark ? "#1e1e22" : "#e8e8e8"}`, borderRadius: 20, padding: "36px 32px", boxShadow: "0 24px 64px rgba(99,102,241,0.1)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff" stroke="none">
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            </svg>
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: dark ? "#f0f0f0" : "#111", letterSpacing: "-0.4px" }}>FlowAI</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: dark ? "#444" : "#aaa" }}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: dark ? "#555" : "#aaa", display: "block", marginBottom: 6 }}>Full Name</label>
            <input value={form.name} onChange={(e) => setForm((x) => ({ ...x, name: e.target.value }))} placeholder="Jordan Developer" style={inputStyle} />
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: dark ? "#555" : "#aaa", display: "block", marginBottom: 6 }}>Email</label>
          <input value={form.email} onChange={(e) => setForm((x) => ({ ...x, email: e.target.value }))} placeholder="you@example.com" type="email" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: dark ? "#555" : "#aaa", display: "block", marginBottom: 6 }}>Password</label>
          <input value={form.password} onChange={(e) => setForm((x) => ({ ...x, password: e.target.value }))} placeholder="••••••••" type="password" style={inputStyle} />
        </div>

        <button onClick={onLogin} style={{ width: "100%", padding: "13px 0", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: dark ? "#444" : "#aaa" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontWeight: 600, fontSize: 13, padding: 0 }}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

        <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: dark ? "#1a1a1e" : "#eee" }} />
          <span style={{ fontSize: 11, color: dark ? "#333" : "#ccc" }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: dark ? "#1a1a1e" : "#eee" }} />
        </div>

        <button onClick={onLogin} style={{ width: "100%", padding: "11px 0", background: "none", border: `1px solid ${dark ? "#222" : "#eee"}`, borderRadius: 12, color: dark ? "#aaa" : "#555", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
          Continue as Guest →
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
