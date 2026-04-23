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
} catch (e) {
console.warn("BroadcastChannel not supported");
}

// =====================
// LOGIN
// =====================
function startSession() {
const input = document.getElementById("nameInput");
const name = (input.value || "").trim();
if (!name) return;

currentUser = name + "_" + Math.random().toString(36).slice(2, 6);

// load saved state
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
screen.style.transition = "opacity 0.5s ease";
screen.style.opacity = "0";
setTimeout(() => (screen.style.display = "none"), 500);

render();

// rebroadcast own data
setTimeout(() => {
Object.entries(STATE.choices).forEach(([group, value]) => {
if (channel) channel.postMessage({ user: currentUser, group, value });
});

```
Object.entries(STATE.text).forEach(([group, users]) => {
  const text = users[currentUser];
  if (text && channel) {
    channel.postMessage({ user: currentUser, group, text });
  }
});
```

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
if (!ZONES || !ZONES.length) {
console.error("ZONES missing");
return;
}

if (!activeZone) activeZone = ZONES[0].id;

const nav = document.getElementById("nav");
const root = document.getElementById("app");

if (!nav || !root) {
console.error("Missing DOM nodes");
return;
}

// NAV
nav.innerHTML = ZONES.map(
(z) => `     <button onclick="setZone('${z.id}', this)" class="${
      z.id === activeZone ? "active" : ""
    }">
      ${z.title}     </button>
  `
).join("");

// ZONES
root.innerHTML = ZONES.map(
(z) => `
<div id="${z.id}" class="zone ${z.id === activeZone ? "active" : ""}"> <h2>${z.title}</h2> <p class="zone-prompt">${z.prompt}</p>

```
  <div class="choice-row">
    ${z.choices
      .map(
        (c) => `
      <button onclick="selectChoice(this,'${z.id}')">${c}</button>
    `
      )
      .join("")}
  </div>

  ${
    z.agg
      ? `<div class="aggregation" id="agg-${z.id}"></div>`
      : ""
  }

  <div class="zone-text-label">Your thought</div>
  <textarea 
    placeholder="Write a short thought..."
    oninput="handleText(this)"
  ></textarea>
</div>
```

`
).join("");

restoreUI();
restoreText();
}

// =====================
// NAVIGATION
// =====================
function setZone(id, btn) {
activeZone = id;

document
.querySelectorAll(".zone-nav button")
.forEach((b) => b.classList.remove("active"));

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

el.parentElement
.querySelectorAll("button")
.forEach((b) => b.classList.remove("active"));

el.classList.add("active");

STATE.choices[group] = value;
saveState();

if (!CLASS[group]) CLASS[group] = { choices: {}, text: {} };
CLASS[group].choices[currentUser] = value;

updateAggregation(group);

if (channel) {
channel.postMessage({ user: currentUser, group, value });
}
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

if (channel) {
channel.postMessage({ user: currentUser, group, text: el.value });
}

if (SHOW_RESPONSES && group === activeZone) {
renderResponsePanel();
}
}

// =====================
// RECEIVE
// =====================
if (channel) {
channel.onmessage = (e) => {
if (FROZEN) return;

```
const { user, group, value, text } = e.data;
if (user === currentUser) return;

if (!CLASS[group]) CLASS[group] = { choices: {}, text: {} };

if (value) {
  CLASS[group].choices[user] = value;
  updateAggregation(group);
}

if (text !== undefined) {
  CLASS[group].text[user] = text;
  if (SHOW_RESPONSES && group === activeZone) {
    renderResponsePanel();
  }
}
```

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

Object.values(CLASS[group].choices).forEach((v) => {
counts[v] = (counts[v] || 0) + 1;
});

el.innerHTML = Object.entries(counts)
.sort((a, b) => b[1] - a[1])
.map(([k, v]) => `<span class="agg-item">${k}: ${v}</span>`)
.join(" ");
}

// =====================
// RESPONSE PANEL
// =====================
function renderResponsePanel() {
const panel = document.getElementById("response-panel");
const group = activeZone;

if (!panel || !group) return;

const classTexts = CLASS[group] ? CLASS[group].text : {};
const myText = STATE.text[group]
? STATE.text[group][currentUser]
: null;

panel.innerHTML = "";

const entries = [];

if (myText) {
entries.push({
name: currentUser.split("_")[0] + " (you)",
text: myText,
});
}

Object.entries(classTexts).forEach(([user, text]) => {
if (user !== currentUser && text) {
entries.push({
name: user.split("_")[0],
text,
});
}
});

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
document
.querySelectorAll(`#${group} .choice-row button`)
.forEach((btn) => {
if (btn.textContent.trim() === val) {
btn.classList.add("active");
}
});
});
}

function restoreText() {
Object.entries(STATE.text).forEach(([group, users]) => {
const el = document.querySelector(`#${group} textarea`);
if (el && users[currentUser]) {
el.value = users[currentUser];
}
});
}

// =====================
// TEACHER CONTROLS
// =====================
function toggleAggregation() {
SHOW_AGG = !SHOW_AGG;

const btn = document.getElementById("btn-agg");
btn.textContent = SHOW_AGG
? "Hide responses"
: "Show responses";

ZONES.forEach((z) => updateAggregation(z.id));
}

function freezeAggregation() {
FROZEN = !FROZEN;

const btn = document.getElementById("btn-freeze");
btn.textContent = FROZEN ? "Unfreeze" : "Freeze";
}

function resetAggregation() {
Object.keys(CLASS).forEach((k) => delete CLASS[k]);
ZONES.forEach((z) => updateAggregation(z.id));
renderResponsePanel();
}

function toggleResponsePanel() {
SHOW_RESPONSES = !SHOW_RESPONSES;

const panel = document.getElementById("response-panel");
const btn = document.getElementById("btn-responses");

panel.classList.toggle("visible", SHOW_RESPONSES);
btn.textContent = SHOW_RESPONSES
? "Hide thoughts"
: "Show thoughts";

if (SHOW_RESPONSES) renderResponsePanel();
}

// =====================
// TEACHER PANEL TOGGLE
// =====================
document.addEventListener("keydown", (e) => {
if (e.key.toLowerCase() === "t") {
const panel = document.getElementById("teacher-panel");
panel.classList.toggle("visible");
}
});
