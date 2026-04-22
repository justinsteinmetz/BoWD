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
} catch (e) {}

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
    } catch (e) {}
  }

  document.body.classList.remove("locked");

  const screen = document.getElementById("login-screen");
  screen.style.opacity = "0";
  setTimeout(() => (screen.style.display = "none"), 400);

  render();

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
  localStorage.setItem(
    "bowd_" + name,
    JSON.stringify({
      choices: STATE.choices,
      text: STATE.text,
    })
  );
}

// =====================
// RENDER
// =====================
function render() {
  const nav = document.getElementById("nav");
  const root = document.getElementById("app");

  if (!nav || !root || !ZONES) {
    console.error("Missing critical elements");
    return;
  }

  nav.innerHTML = ZONES.map(
    (z) => `
    <button onclick="setZone('${z.id}', this)" class="${
      z.id === activeZone ? "active" : ""
    }">
      ${z.title}
    </button>
  `
  ).join("");

  root.innerHTML = ZONES.map(
    (z) => `
    <div id="${z.id}" class="zone ${z.id === activeZone ? "active" : ""}">
      <h2>${z.title}</h2>
      <p class="zone-prompt">${z.prompt}</p>

      <div class="choice-row">
        ${z.choices
          .map(
            (c) => `
          <button onclick="selectChoice(this,'${z.id}')">${c}</button>
        `
          )
          .join("")}
      </div>

      ${z.agg ? `<div class="aggregation" id="agg-${z.id}"></div>` : ""}

      <div class="zone-text-label">Your thought</div>
      <textarea placeholder="Write a short thought..." onblur="handleText(this)"></textarea>
    </div>
  `
  ).join("");

  activeZone = activeZone || ZONES[0].id;

  restoreUI();
  restoreText();
}

// =====================
// NAVIGATION
// =====================
function setZone(id, btn) {
  activeZone = id;

  document.querySelectorAll(".zone-nav button").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  ZONES.forEach((z) => {
    const el = document.getElementById(z.id);
    if (el) el.classList.toggle("active", z.id === id);
  });

  if (SHOW_RESPONSES) renderResponsePanel();
}

// =====================
// CHOICES
// =====================
function selectChoice(el, group) {
  const value = el.textContent.trim();
  if (STATE.choices[group] === value) return;

  el.parentElement.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
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
  const zoneEl = el.closest(".zone");
  if (!zoneEl) return;

  const group = zoneEl.id;

  if (!STATE.text[group]) STATE.text[group] = {};
  STATE.text[group][currentUser] = el.value;

  saveState();

  if (!CLASS[group]) CLASS[group] = { choices: {}, text: {} };
  CLASS[group].text[currentUser] = el.value;

  if (channel) channel.postMessage({ user: currentUser, group, text: el.value });

  if (SHOW_RESPONSES && group === activeZone) renderResponsePanel();
}
