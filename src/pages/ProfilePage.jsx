import { useState } from "react";
import Icon from "../components/Icon";
import { getInitials } from "../utils/helpers";

const ProfilePage = ({ dark, addToast, userName, setUserName }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name:  userName || "Jordan Dev",
    email: "jordan@flowai.app",
    role:  "Senior Developer",
    bio:   "Building amazing products at the intersection of design and engineering.",
  });

  const inputStyle = {
    width: "100%", padding: "9px 12px", borderRadius: 9, fontSize: 13,
    border: `1px solid ${dark ? "#2a2a2e" : "#e8e8e8"}`,
    background: dark ? "#0f0f11" : "#fafafa",
    color: dark ? "#ccc" : "#333", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ padding: 28, maxWidth: 640 }}>
      {/* Profile card */}
      <div style={{ background: dark ? "#141416" : "#fff", border: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`, borderRadius: 16, padding: "28px 28px", marginBottom: 20 }}>
        {/* Avatar row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
            {getInitials(form.name)}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: dark ? "#e0e0e0" : "#111" }}>{form.name}</h2>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: dark ? "#555" : "#aaa" }}>{form.role}</p>
            <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 6, background: "#eff0ff", color: "#6366f1", fontWeight: 600, display: "inline-block", marginTop: 4 }}>Pro Plan</span>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", background: editing ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : (dark ? "#1a1a1e" : "#f5f5f5"), border: "none", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 500, color: editing ? "#fff" : (dark ? "#777" : "#555") }}
          >
            <Icon name="edit" size={14} /> {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Fields */}
        {[
          { label: "Display Name", key: "name"  },
          { label: "Email",        key: "email" },
          { label: "Role",         key: "role"  },
        ].map((f) => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: dark ? "#444" : "#aaa", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{f.label}</label>
            {editing ? (
              <input value={form[f.key]} onChange={(e) => setForm((x) => ({ ...x, [f.key]: e.target.value }))} style={inputStyle} />
            ) : (
              <p style={{ margin: 0, fontSize: 14, color: dark ? "#bbb" : "#333" }}>{form[f.key]}</p>
            )}
          </div>
        ))}

        {/* Bio */}
        <div>
          <label style={{ fontSize: 11, color: dark ? "#444" : "#aaa", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>Bio</label>
          {editing ? (
            <textarea value={form.bio} onChange={(e) => setForm((x) => ({ ...x, bio: e.target.value }))} rows={3}
              style={{ ...inputStyle, resize: "none" }} />
          ) : (
            <p style={{ margin: 0, fontSize: 14, color: dark ? "#bbb" : "#444", lineHeight: 1.6 }}>{form.bio}</p>
          )}
        </div>

        {editing && (
          <button
            onClick={() => { setEditing(false); setUserName(form.name); addToast("Profile updated!", "success"); }}
            style={{ marginTop: 18, padding: "10px 20px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 9, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[
          { label: "Tasks Done", value: "47"     },
          { label: "Notes",      value: "12"     },
          { label: "Streak",     value: "5 days" },
        ].map((s, i) => (
          <div key={i} style={{ background: dark ? "#141416" : "#fff", border: `1px solid ${dark ? "#1e1e22" : "#f0f0f0"}`, borderRadius: 12, padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: dark ? "#d0d0d0" : "#111" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: dark ? "#444" : "#aaa", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
