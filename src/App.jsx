import { useState, useEffect, useCallback } from "react";

// Utils
import { uid, STORAGE } from "./utils/helpers";
import { INIT_TASKS, INIT_NOTES, INIT_CHAT } from "./utils/data";

// Components
import Sidebar         from "./components/Sidebar";
import Header          from "./components/Header";
import Toast           from "./components/Toast";
import CommandPalette  from "./components/CommandPalette";

// Pages
import AuthPage        from "./pages/AuthPage";
import DashboardPage   from "./pages/DashboardPage";
import ChatPage        from "./pages/ChatPage";
import TasksPage       from "./pages/TasksPage";
import NotesPage       from "./pages/NotesPage";
import AnalyticsPage   from "./pages/AnalyticsPage";
import ProfilePage     from "./pages/ProfilePage";

const PAGE_TITLES = {
  dashboard: { title: "Dashboard",    subtitle: "Your productivity overview" },
  chat:      { title: "AI Chat",      subtitle: "Powered by FlowAI"          },
  tasks:     { title: "Task Manager", subtitle: "Kanban board"               },
  notes:     { title: "Notes",        subtitle: "Your personal notebook"     },
  analytics: { title: "Analytics",    subtitle: "Performance insights"       },
  profile:   { title: "Profile",      subtitle: "Your account settings"      },
};

export default function App() {
  const [dark,      setDark]      = useState(() => STORAGE.get("dark",     false));
  const [authed,    setAuthed]    = useState(false);
  const [userName,  setUserName]  = useState(() => STORAGE.get("userName", "Jordan Dev"));
  const [page,      setPage]      = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen,   setCmdOpen]   = useState(false);
  const [toasts,    setToasts]    = useState([]);
  const [tasks,     setTasks]     = useState(() => STORAGE.get("tasks", INIT_TASKS));
  const [notes,     setNotes]     = useState(() => STORAGE.get("notes", INIT_NOTES));
  const [chats,     setChats]     = useState(INIT_CHAT);

  // Persistence
  useEffect(() => { STORAGE.set("dark",     dark);     }, [dark]);
  useEffect(() => { STORAGE.set("userName", userName); }, [userName]);
  useEffect(() => { STORAGE.set("tasks",    tasks);    }, [tasks]);
  useEffect(() => { STORAGE.set("notes",    notes);    }, [notes]);

  // Command palette keyboard shortcut  ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(true); }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const addToast = useCallback((msg, type = "info") => {
    const id = uid();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  // ── Auth gate ───────────────────────────────────────────────────────────────
  if (!authed) {
    return <AuthPage dark={dark} onLogin={() => setAuthed(true)} />;
  }

  const { title, subtitle } = PAGE_TITLES[page] || {};

  // ── Main layout ─────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: dark ? "#0a0a0b" : "#fafafa" }}>
      <Sidebar
        active={page}
        setActive={setPage}
        dark={dark}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        userName={userName}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <Header
          title={title}
          subtitle={subtitle}
          dark={dark}
          setDark={setDark}
          addToast={addToast}
          setCmd={setCmdOpen}
        />

        <main style={{ flex: 1, overflowY: "auto" }}>
          {page === "dashboard" && (
            <DashboardPage dark={dark} tasks={tasks} notes={notes} chats={chats} addToast={addToast} setActive={setPage} userName={userName} />
          )}
          {page === "chat" && (
            <ChatPage dark={dark} chats={chats} setChats={setChats} addToast={addToast} userName={userName} />
          )}
          {page === "tasks" && (
            <TasksPage dark={dark} tasks={tasks} setTasks={setTasks} addToast={addToast} />
          )}
          {page === "notes" && (
            <NotesPage dark={dark} notes={notes} setNotes={setNotes} addToast={addToast} />
          )}
          {page === "analytics" && (
            <AnalyticsPage dark={dark} tasks={tasks} />
          )}
          {page === "profile" && (
            <ProfilePage dark={dark} addToast={addToast} userName={userName} setUserName={setUserName} />
          )}
        </main>
      </div>

      {cmdOpen && (
        <CommandPalette dark={dark} onClose={() => setCmdOpen(false)} setActive={setPage} />
      )}

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
