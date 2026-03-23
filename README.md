# FlowAI — Productivity Dashboard

A premium SaaS-style productivity dashboard built with **React 18 + Vite 5**.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## 📁 Project Structure

```
flowai/
├── public/
│   └── favicon.svg              # Bar-chart productivity icon
├── src/
│   ├── components/
│   │   ├── Icon.jsx             # All SVG icons
│   │   ├── Sidebar.jsx          # Collapsible nav sidebar
│   │   ├── Header.jsx           # Top bar (search, bell, theme)
│   │   ├── CommandPalette.jsx   # ⌘K quick navigation
│   │   └── Toast.jsx            # Notification toasts
│   ├── pages/
│   │   ├── AuthPage.jsx         # Login / Signup UI
│   │   ├── DashboardPage.jsx    # Overview + stats
│   │   ├── ChatPage.jsx         # AI Chat interface
│   │   ├── TasksPage.jsx        # Kanban board
│   │   ├── NotesPage.jsx        # Notion-style editor
│   │   ├── AnalyticsPage.jsx    # Charts & trends
│   │   └── ProfilePage.jsx      # User profile + initials avatar
│   ├── utils/
│   │   ├── helpers.js           # uid, getInitials, STORAGE, etc.
│   │   └── data.js              # Seed data & AI responses
│   ├── App.jsx                  # Root component + routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles & animations
├── index.html
├── package.json
└── vite.config.js
```

## ✨ Features

| Feature | Details |
|---|---|
| 🧠 AI Chat | ChatGPT-style UI with typing animation |
| 📋 Kanban Board | Drag & drop tasks across columns |
| 📊 Analytics | Bar charts, line graph, distribution |
| 📝 Notes | Auto-save Notion-style editor |
| 🔐 Auth UI | Login/Signup with glassmorphism |
| 🌙 Dark/Light | Smooth toggle, persisted |
| ⌨️ Cmd Palette | `⌘K` / `Ctrl+K` quick nav |
| 👤 Initials Avatar | Auto from name (Jordan Dev → JD) |
| 💾 Persistence | localStorage for tasks, notes, theme |

## 🛠 Tech Stack

- **React 18** — hooks, functional components
- **Vite 5** — fast dev server & build
- **Inline styles** — zero CSS-in-JS dependency
- **localStorage** — client-side state persistence
