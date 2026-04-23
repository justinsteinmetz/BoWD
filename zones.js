// ===== ZONES DATA (FIXED) =====

const ZONES = [
  {
    id: "z1",
    title: "First Impressions",
    prompt: "What stands out in this moment?",
    choices: ["Character", "Setting", "Feeling", "Action"],
    agg: true
  },
  {
    id: "z2",
    title: "Understanding",
    prompt: "What do you think is happening?",
    choices: ["Clear", "Confusing", "Interesting", "Strange"],
    agg: true
  },
  {
    id: "z3",
    title: "Connection",
    prompt: "How does this connect to something else?",
    choices: ["My life", "Another story", "The world", "Nothing yet"],
    agg: true
  },
  {
    id: "z4",
    title: "Interpretation",
    prompt: "What might this mean?",
    choices: ["Important", "Not important", "Unsure", "Symbolic"],
    agg: true
  },
  {
    id: "z5",
    title: "Character's Heart",
    prompt: "What is Opal feeling right now?",
    choices: ["Lonely", "Hopeful", "Confused", "Brave", "Loved"],
    agg: true
  },
  {
    id: "z6",
    title: "The Dog's Role",
    prompt: "How does Winn-Dixie change things?",
    choices: [
      "Brings people together",
      "Creates trouble",
      "Shows loyalty",
      "Teaches a lesson",
      "All of these"
    ],
    agg: true
  }
];

// 🔑 CRITICAL FIX: expose correct variable name for app.js
const zones = ZONES;
