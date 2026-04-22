// =====================
// GLOBAL STATE
// =====================
const STATE = { choices: {}, text: {} };
const CLASS = {};

let currentUser = null;
let activeZone = null;

let SHOW_AGG = true;
let FROZEN = false;
let SHOW_RESPONSES = false;

// =====================
// CHANNEL
// =====================
let channel = null;
try {
  channel = new BroadcastChannel("bowd-class");
} catch(e) {}

// =====================
// LOGIN
// =====================
function startSession() {
  const input = document.getElementById("nameInput");
  const name = (input.value || "").trim();
  if (!name) return;

  currentUser = name + "_" + Math.random().toString(36).slice(2, 6);

  const saved = localStorage.getItem("bowd_" + name);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      STATE.choices = parsed.choices || {};
      STATE.text = parsed.text || {};
    } catch(e) {}
  }

  document.body.classList.remove("locked");

  const screen = document.getElementById("login-screen");
  screen.style.opacity = "0";
  setTimeout(() => screen.style.display = "none", 400);

  render();

  // rebroadcast own state so peers can see returning user
  setTimeout(() => {
    Object.entries(STATE.choices).forEach(([group, value]) => {
      if (channel) channel.postMessage({ user: currentUser, group, value });
    });
    Object.entries(STATE.text).forEach(([group, texts]) => {
      const text = texts[currentUser];
      if (text && channel) channel.postMessage({ user: currentUser, group, text });
    });
  }, 200);
}

// =====================
// SAVE
// =====================
function saveState() {
  if (!currentUser) return;
  const name = currentUser.split("_")[0];
  localStorage.setItem("bowd_" + name, JSON.stringify({
    choices: STATE.choices,
    text: STATE.text
  }));
}

// =====================
// RENDER
// =====================
function render() {
  const nav = document.getElementById("nav");
  nav.innerHTML = ZONES.map((z, i) => `
    <button onclick="setZone('${z.id}', this)" class="${i === 0 ? 'active' : ''}">
      ${z.title}
    </button>
  `).join("");

  const root = document.getElementById("app");
  root.innerHTML = ZONES.map((z, i) => `
    <div id="${z.id}" class="zone ${i === 0 ? 'active' : ''}">
      <h2>${z.title}</h2>
      <p class="zone-prompt">${z.prompt}</p>

      <div class="choice-row">
        ${z.choices.map(c => `
          <button onclick="selectChoice(this,'${z.id}')">${c}</button>
        `).join("")}
      </div>

      ${z.agg ? `<div class="aggregation" id="agg-${z.id}"></div>` : ""}

      <div class="zone-text-label">Your thought</div>
      <textarea placeholder="Write a short thought..." oninput="handleText(this)"></textarea>
    </div>
  `).join("");

  activeZone = ZONES[0].id;
  restoreUI();
  restoreText();
}

// =====================
// NAVIGATION
// =====================
function setZone(id, btn) {
  activeZone = id;

  // update nav buttons
  document.querySelectorAll(".zone-nav button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  // show/hide zones
  ZONES.forEach(z => {
    document.getElementById(z.id).classList.toggle("active", z.id === id);
  });

  // refresh response panel for new zone
  if (SHOW_RESPONSES) renderResponsePanel();
}

// =====================
// CHOICES
// =====================
function selectChoice(el, group) {
  const value = el.textContent.trim();
  if (STATE.choices[group] === value) return;

  el.parentElement.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  STATE.choices[group] = value;
  saveState();

  if (!CLASS[group]) CLASS[group] = { choices: {}, text: {} };
  CLASS[group].choices[currentUser] = value;

  updateAggregation(group);

  if (channel) channel.postMessage({ user: currentUser, group, value });
}

// =====================
// TEXT
// =====================
function handleText(el) {
  const group = el.closest(".zone").id;

  if (!STATE.text[group]) STATE.text[group] = {};
  STATE.text[group][currentUser] = el.value;

  saveState();

  if (!CLASS[group]) CLASS[group] = { choices: {}, text: {} };
  CLASS[group].text[currentUser] = el.value;

  if (channel) channel.postMessage({ user: currentUser, group, text: el.value });

  if (SHOW_RESPONSES && group === activeZone) renderResponsePanel();
}

// =====================
// RECEIVE
// =====================
if (channel) {
  channel.onmessage = (e) => {
    if (FROZEN) return;

    const { user, group, value, text } = e.data;
    if (user === currentUser) return;

    if (!CLASS[group]) CLASS[group] = { choices: {}, text: {} };

    if (value) {
      CLASS[group].choices[user] = value;
      updateAggregation(group);
    }

    if (text !== undefined) {
      CLASS[group].text[user] = text;
      if (SHOW_RESPONSES && group === activeZone) renderResponsePanel();
    }
  };
}

// =====================
// AGGREGATION
// =====================
function updateAggregation(group) {
  const el = document.getElementById("agg-" + group);
  if (!el) return;

  if (!SHOW_AGG || !CLASS[group]) {
    el.innerHTML = "";
    return;
  }

  const counts = {};
  Object.values(CLASS[group].choices).forEach(v => {
    counts[v] = (counts[v] || 0) + 1;
  });

  el.innerHTML = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `<span class="agg-item">${k}: ${v}</span>`)
    .join("");
}

// =====================
// RESPONSE PANEL
// =====================
function renderResponsePanel() {
  const panel = document.getElementById("response-panel");
  const group = activeZone;
  const classTexts = CLASS[group] ? CLASS[group].text : {};
  const myText = STATE.text[group] ? STATE.text[group][currentUser] : null;

  // Collect all texts: own first, then peers
  const entries = [];
  if (myText) entries.push({ name: currentUser.split("_")[0] + " (you)", text: myText });
  Object.entries(classTexts).forEach(([user, text]) => {
    if (user !== currentUser && text) entries.push({ name: user.split("_")[0], text });
  });

  const existing = panel.querySelectorAll(".response-entry");
  existing.forEach(e => e.remove());

  entries.forEach(({ name, text }) => {
    const div = document.createElement("div");
    div.className = "response-entry";
    div.innerHTML = `<span class="response-name">${name}</span>${text}`;
    panel.appendChild(div);
  });
}

// =====================
// RESTORE
// =====================
function restoreUI() {
  Object.entries(STATE.choices).forEach(([group, val]) => {
    document.querySelectorAll(`#${group} .choice-row button`).forEach(btn => {
      if (btn.textContent.trim() === val) btn.classList.add("active");
    });
  });
}

function restoreText() {
  Object.entries(STATE.text).forEach(([group, users]) => {
    const el = document.querySelector(`#${group} textarea`);
    if (el && users[currentUser]) el.value = users[currentUser];
  });
}

// =====================
// TEACHER CONTROLS
// =====================
function toggleAggregation() {
  SHOW_AGG = !SHOW_AGG;
  const btn = document.getElementById("btn-agg");
  btn.textContent = SHOW_AGG ? "Hide responses" : "Show responses";
  btn.classList.toggle("on", !SHOW_AGG);
  // Refresh all visible agg displays
  ZONES.forEach(z => updateAggregation(z.id));
}

function freezeAggregation() {
  FROZEN = !FROZEN;
  const btn = document.getElementById("btn-freeze");
  btn.textContent = FROZEN ? "Unfreeze" : "Freeze";
  btn.classList.toggle("on", FROZEN);
}

function resetAggregation() {
  Object.keys(CLASS).forEach(k => delete CLASS[k]);
  ZONES.forEach(z => updateAggregation(z.id));
  renderResponsePanel();
}

function toggleResponsePanel() {
  SHOW_RESPONSES = !SHOW_RESPONSES;
  const panel = document.getElementById("response-panel");
  const btn = document.getElementById("btn-responses");
  panel.classList.toggle("visible", SHOW_RESPONSES);
  btn.textContent = SHOW_RESPONSES ? "Hide thoughts" : "Show thoughts";
  btn.classList.toggle("on", SHOW_RESPONSES);
  if (SHOW_RESPONSES) renderResponsePanel();
}

// ── T key opens teacher panel ──
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "t") {
    const panel = document.getElementById("teacher-panel");
    panel.classList.toggle("visible");
  }
});
