// ===== STATE =====
let studentName = "";

// Per-zone persistence: selections and textarea content
// { zoneId: { choice: "...", text: "..." } }
const zoneState = {};

// Aggregation counts: { zoneId: { choiceLabel: count } }
const aggCounts = {};

// Aggregation display toggle
let aggVisible = true;

// Aggregation frozen
let aggFrozen = false;

// Focus mode toggle
let focusMode = false;

// Currently rendered zone index
let currentZoneIndex = 0;

// ===== START SESSION =====
function startSession() {
  const input = document.getElementById("nameInput");

  if (!input) {
    console.error("nameInput not found");
    return;
  }

  const name = input.value.trim();

  if (!name) {
    input.placeholder = "Please enter your name";
    return;
  }

  studentName = name;

  // hide login
  const login = document.getElementById("login-screen");
  if (login) login.style.display = "none";

  // unlock scroll
  document.body.classList.remove("locked");

  // init app
  initApp();
}

// ===== INIT APP =====
function initApp() {
  if (typeof zones === "undefined") {
    console.error("zones.js not loaded");
    return;
  }

  // Pre-init aggregation counts for all zones
  zones.forEach(zone => {
    if (!aggCounts[zone.id]) {
      aggCounts[zone.id] = {};
      zone.choices.forEach(c => { aggCounts[zone.id][c] = 0; });
    }
  });

  renderNav();
  renderZone(0);
}

// ===== NAV =====
function renderNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";

  zones.forEach((zone, i) => {
    const btn = document.createElement("button");
    btn.textContent = zone.title;

    if (i === 0) btn.classList.add("active");

    btn.onclick = () => {
      document.querySelectorAll(".zone-nav button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      switchZone(i);
    };

    nav.appendChild(btn);
  });
}

// ===== ZONE SWITCH WITH FADE =====
function switchZone(index) {
  const app = document.getElementById("app");
  const current = app.querySelector(".zone.active");

  // Save current state before switching
  if (current) {
    saveCurrentZoneState(current);

    // Fade out
    current.style.transition = "opacity 150ms ease";
    current.style.opacity = "0";

    setTimeout(() => {
      renderZone(index);
    }, 160);
  } else {
    renderZone(index);
  }
}

// ===== SAVE STATE FROM DOM =====
function saveCurrentZoneState(sectionEl) {
  const zone = zones[currentZoneIndex];
  if (!zone) return;

  const textarea = sectionEl.querySelector("textarea");
  const selectedBtn = sectionEl.querySelector(".choice-row button.selected");

  if (!zoneState[zone.id]) zoneState[zone.id] = {};
  if (textarea)    zoneState[zone.id].text   = textarea.value;
  if (selectedBtn) zoneState[zone.id].choice = selectedBtn.textContent;
}

// ===== RENDER ZONE =====
function renderZone(index) {
  currentZoneIndex = index;
  const app = document.getElementById("app");
  const zone = zones[index];

  // Retrieve persisted state
  const saved = zoneState[zone.id] || {};

  // Build aggregation row (only for zones with agg:true)
  const aggHtml = zone.agg
    ? `<div class="aggregation" id="agg-${zone.id}" ${aggVisible ? "" : 'style="display:none"'}>${buildAggHtml(zone)}</div>`
    : "";

  app.innerHTML = `
    <section class="zone" style="opacity:0">
      <h2>${zone.title}</h2>
      <div class="zone-prompt">${zone.prompt}</div>

      <div class="choice-row">
        ${zone.choices.map(c => {
          const isSelected = saved.choice === c;
          return `<button class="${isSelected ? "selected" : ""}" data-choice="${c}">${c}</button>`;
        }).join("")}
      </div>

      ${aggHtml}

      <div class="zone-text-label">Your thoughts</div>
      <textarea placeholder="Write a short thought...">${saved.text || ""}</textarea>
    </section>
  `;

  const section = app.querySelector(".zone");

  // Wire up choice buttons
  section.querySelectorAll(".choice-row button").forEach(btn => {
    btn.addEventListener("click", () => {
      // Deselect all
      section.querySelectorAll(".choice-row button").forEach(b => b.classList.remove("selected"));
      // Select clicked
      btn.classList.add("selected");
      // Record in state immediately
      if (!zoneState[zone.id]) zoneState[zone.id] = {};
      zoneState[zone.id].choice = btn.dataset.choice;
      // Update aggregation
      if (!aggFrozen && zone.agg) recordAgg(zone, btn.dataset.choice);
    });
  });

  // Autosave textarea on input
  const textarea = section.querySelector("textarea");
  if (textarea) {
    textarea.addEventListener("input", () => {
      if (!zoneState[zone.id]) zoneState[zone.id] = {};
      zoneState[zone.id].text = textarea.value;
    });
  }

  // Fade in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      section.classList.add("active");
      section.style.transition = "opacity 180ms ease";
      section.style.opacity = "1";
    });
  });
}

// ===== AGGREGATION =====

function recordAgg(zone, choiceLabel) {
  if (!aggCounts[zone.id]) aggCounts[zone.id] = {};
  // Simple increment — one vote per click (replaces previous)
  // To track per-student: would need more state; here we just +1 on each click
  if (aggCounts[zone.id][choiceLabel] === undefined) aggCounts[zone.id][choiceLabel] = 0;
  aggCounts[zone.id][choiceLabel]++;
  refreshAggDisplay(zone.id);
}

function buildAggHtml(zone) {
  const counts = aggCounts[zone.id] || {};
  return zone.choices.map(c => {
    const n = counts[c] || 0;
    return `<span class="agg-item">${c} <strong>${n}</strong></span>`;
  }).join("");
}

function refreshAggDisplay(zoneId) {
  const container = document.getElementById(`agg-${zoneId}`);
  if (!container) return;
  const zone = zones.find(z => z.id === zoneId);
  if (!zone) return;
  container.innerHTML = buildAggHtml(zone);
}

// ===== TEACHER CONTROLS =====

function toggleAggregation() {
  aggVisible = !aggVisible;
  const btn = document.getElementById("btn-agg");
  const containers = document.querySelectorAll(".aggregation");
  containers.forEach(c => { c.style.display = aggVisible ? "" : "none"; });
  btn.textContent = aggVisible ? "Hide responses" : "Show responses";
  btn.classList.toggle("on", !aggVisible);
}

function freezeAggregation() {
  aggFrozen = !aggFrozen;
  const btn = document.getElementById("btn-freeze");
  btn.textContent = aggFrozen ? "Unfreeze" : "Freeze";
  btn.classList.toggle("on", aggFrozen);
}

function resetAggregation() {
  zones.forEach(zone => {
    aggCounts[zone.id] = {};
    zone.choices.forEach(c => { aggCounts[zone.id][c] = 0; });
    refreshAggDisplay(zone.id);
  });
}

function toggleResponsePanel() {
  const panel = document.getElementById("response-panel");
  const btn = document.getElementById("btn-responses");
  const isVisible = panel.classList.toggle("visible");
  panel.style.display = isVisible ? "block" : "none";
  btn.textContent = isVisible ? "Hide thoughts" : "Show thoughts";
  btn.classList.toggle("on", isVisible);
}

// ===== FOCUS MODE =====

function toggleFocusMode() {
  focusMode = !focusMode;
  document.body.classList.toggle("focus-mode", focusMode);
}

// ===== TEACHER PANEL KEYBOARD SHORTCUT =====
// Press Shift+T to reveal teacher panel
document.addEventListener("keydown", e => {
  if (e.shiftKey && e.key === "T") {
    const panel = document.getElementById("teacher-panel");
    panel.classList.toggle("visible");
  }
  // Shift+F for focus mode
  if (e.shiftKey && e.key === "F") {
    toggleFocusMode();
  }
});
