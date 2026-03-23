import { useState, useEffect, useRef } from "react";
import Icon from "../components/Icon";
import { uid, now, getInitials } from "../utils/helpers";
import { INIT_CHAT, AI_RESPONSES } from "../utils/data";

const ChatPage = ({ dark, chats, setChats, addToast, userName }) => {
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const [sessions]          = useState([
    { id: 1, title: "Product brainstorm", date: "Today"     },
    { id: 2, title: "API design review",  date: "Yesterday" },
    { id: 3, title: "Marketing copy",     date: "Mon"       },
  ]);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, typing]);

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = { id: uid(), role: "user", content: input.trim(), time: now() };
    setChats((c) => [...c, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const resp = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setChats((c) => [...c, { id: uid(), role: "assistant", content: resp, time: now() }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
      {/* Session sidebar */}
      <div style={{ width: 200, borderRight: `1px solid ${dark ? "#1a1a1e" : "#f0f0f0"}`, background: dark ? "#0c0c0d" : "#fafafa", padding: "16px 12px", overflowY: "auto", flexShrink: 0 }}>
        <button
          onClick={() => { setChats(INIT_CHAT); addToast("New chat started", "success"); }}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 9, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, marginBottom: 14 }}
        >
          <Icon name="plus" size={14} /> New Chat
        </button>

        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: dark ? "#333" : "#bbb", fontWeight: 600, marginBottom: 8 }}>HISTORY</div>

        {sessions.map((s) => (
          <div key={s.id} style={{ padding: "9px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: s.id === 1 ? (dark ? "#1a1a22" : "#eff0ff") : "transparent" }}>
            <div style={{ fontSize: 12, color: dark ? "#aaa" : "#444", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
            <div style={{ fontSize: 10, color: dark ? "#333" : "#bbb", marginTop: 1 }}>{s.date}</div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {chats.map((msg) => (
            <div key={msg.id} style={{ display: "flex", gap: 12, marginBottom: 20, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: msg.role === "assistant" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #f59e0b, #ef4444)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: "#fff", fontWeight: 700, letterSpacing: "0.5px",
              }}>
                {msg.role === "assistant"
                  ? <svg width={14} height={14} viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /></svg>
                  : getInitials(userName)
                }
              </div>
              <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : (dark ? "#141416" : "#f8f8f8"),
                  color: msg.role === "user" ? "#fff" : (dark ? "#ccc" : "#333"),
                  fontSize: 14, lineHeight: 1.6,
                  border: msg.role === "assistant" ? `1px solid ${dark ? "#1e1e22" : "#efefef"}` : "none",
                }}>
                  {msg.content}
                </div>
                <span style={{ fontSize: 10, color: dark ? "#333" : "#bbb", marginTop: 4 }}>{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /></svg>
              </div>
              <div style={{ padding: "12px 16px", borderRadius: "4px 16px 16px 16px", background: dark ? "#141416" : "#f8f8f8", border: `1px solid ${dark ? "#1e1e22" : "#efefef"}`, display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: dark ? "#444" : "#ccc", animation: `bounce 1.4s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${dark ? "#1a1a1e" : "#f0f0f0"}`, background: dark ? "#0a0a0b" : "#fafafa" }}>
          <div style={{ display: "flex", gap: 10, background: dark ? "#141416" : "#fff", border: `1px solid ${dark ? "#222" : "#eee"}`, borderRadius: 14, padding: "8px 8px 8px 16px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMsg()}
              placeholder="Ask anything…"
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: dark ? "#ccc" : "#333" }}
            />
            <button
              onClick={sendMsg}
              disabled={!input.trim() || typing}
              style={{
                padding: "9px 16px", borderRadius: 10, border: "none",
                cursor: input.trim() ? "pointer" : "default",
                background: input.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : (dark ? "#1a1a1e" : "#f0f0f0"),
                color: input.trim() ? "#fff" : (dark ? "#333" : "#bbb"),
                display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600,
              }}
            >
              <Icon name="send" size={14} />
            </button>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: dark ? "#2a2a2e" : "#ddd", textAlign: "center" }}>
            AI may make mistakes. Double-check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
