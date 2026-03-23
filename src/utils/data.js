import { uid } from "./helpers";

export const INIT_TASKS = {
  todo: [
    { id: uid(), title: "Design system audit", priority: "high", tag: "Design" },
    { id: uid(), title: "Write API documentation", priority: "medium", tag: "Dev" },
    { id: uid(), title: "Quarterly review prep", priority: "low", tag: "Work" },
  ],
  progress: [
    { id: uid(), title: "Build dashboard UI", priority: "high", tag: "Dev" },
    { id: uid(), title: "User research interviews", priority: "medium", tag: "Research" },
  ],
  done: [
    { id: uid(), title: "Set up CI/CD pipeline", priority: "low", tag: "Dev" },
    { id: uid(), title: "Brand identity refresh", priority: "high", tag: "Design" },
  ],
};

export const INIT_NOTES = [
  {
    id: uid(),
    title: "Product roadmap ideas",
    content:
      "Focus on mobile-first approach. Key features: offline sync, AI suggestions, collaborative editing.\n\nMilestones:\n- Q1: Core features\n- Q2: Beta launch\n- Q3: Public release",
    updatedAt: "2 hours ago",
  },
  {
    id: uid(),
    title: "Meeting notes - Design sync",
    content:
      "Discussed new component library migration. Action items:\n- Update Figma tokens\n- Review accessibility guidelines\n- Schedule follow-up",
    updatedAt: "Yesterday",
  },
  {
    id: uid(),
    title: "Learning resources",
    content:
      "Books to read:\n- Atomic Design by Brad Frost\n- Shape Up by Basecamp\n- The Design of Everyday Things",
    updatedAt: "3 days ago",
  },
];

export const INIT_CHAT = [
  {
    id: uid(),
    role: "assistant",
    content:
      "Hello! I'm your AI assistant. I can help you brainstorm ideas, draft content, answer questions, or analyze data. What would you like to work on today?",
    time: "9:00 AM",
  },
];

export const AI_RESPONSES = [
  "That's a great question! Based on current best practices, I'd suggest breaking this into three phases: research, prototyping, and iteration. Each phase should have clear success metrics.",
  "I can help with that. Here's a structured approach: First, define your core objectives. Then map out dependencies and potential blockers. Finally, create a timeline with buffer for unexpected challenges.",
  "Interesting perspective! From what I know about this topic, there are several key considerations: scalability, maintainability, and user experience. Would you like me to elaborate on any of these?",
  "Great idea! To make this more actionable, consider setting SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound. This framework works especially well for project planning.",
  "I've analyzed your request. The most efficient approach would be to start with the highest-impact items first, then work your way through lower-priority tasks. This follows the Pareto principle.",
];
