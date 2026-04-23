// ===== STATE =====
let studentName      = "";
const zoneState      = {};   // keyed "blockId-zoneId"
let focusMode        = false;
let currentBlockIndex = 0;
let currentZoneIndex  = 0;

const unlockedBlocks = new Set([0]);   // index-based

// ===== PERSISTENCE =====
const STORE_KEY = () => `bowd_${studentName}`;

function saveToStorage() {
  if (!studentName) return;
  try { localStorage.setItem(STORE_KEY(), JSON.stringify(zoneState)); } catch (e) {}
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORE_KEY());
    if (raw) Object.assign(zoneState, JSON.parse(raw));
  } catch (e) {}
}

function stateKey(blockId, zoneId) { return `${blockId}-${zoneId}`; }

// ===== LOGIN =====
function startSession() {
  const input = document.getElementById("nameInput");
  const name  = input.value.trim();
  if (!name) { input.placeholder = "Please enter your name"; return; }
  studentName = name;
  loadFromStorage();
  document.getElementById("login-screen").style.display = "none";
  document.body.classList.remove("locked");
  initApp();
}

// ===== INIT =====
function initApp() {
  if (typeof blocks === "undefined") { console.error("blocks.js not loaded"); return; }
  renderBlockNav();
  renderZoneNav();
  renderZone(currentBlockIndex, currentZoneIndex);
}

// ===== BLOCK NAV =====
function renderBlockNav() {
  const nav = document.getElementById("block-nav");
  nav.innerHTML = "";
  blocks.forEach((block, bi) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<span class="block-chapters">${block.chapters}</span><span class="block-title">${block.title}</span>`;
    if (bi === currentBlockIndex) btn.classList.add("active");
    if (!unlockedBlocks.has(bi)) {
      btn.classList.add("locked");
      btn.disabled = true;
    }
    btn.onclick = () => {
      if (!unlockedBlocks.has(bi)) return;
      currentBlockIndex = bi;
      currentZoneIndex  = 0;
      document.querySelectorAll("#block-nav button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderZoneNav();
      renderZone(currentBlockIndex, currentZoneIndex);
    };
    nav.appendChild(btn);
  });
}

// ===== ZONE NAV =====
function renderZoneNav() {
  const nav  = document.getElementById("zone-nav");
  const block = blocks[currentBlockIndex];
  nav.innerHTML = "";
  block.zones.forEach((zone, zi) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<span class="nav-num">${zi + 1}</span>${zone.title}`;
    if (zi === currentZoneIndex) btn.classList.add("active");
    btn.onclick = () => {
      document.querySelectorAll("#zone-nav button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      switchZone(zi);
    };
    nav.appendChild(btn);
  });
}

// ===== ZONE SWITCH =====
function switchZone(zoneIndex) {
  const app     = document.getElementById("app");
  const current = app.querySelector(".zone.active");
  if (current) {
    current.style.transition = "opacity 140ms ease";
    current.style.opacity    = "0";
    setTimeout(() => renderZone(currentBlockIndex, zoneIndex), 150);
  } else {
    renderZone(currentBlockIndex, zoneIndex);
  }
}

// ===== ZONE ROUTER =====
function renderZone(blockIndex, zoneIndex) {
  currentZoneIndex = zoneIndex;
  const block = blocks[blockIndex];
  const zone  = block.zones[zoneIndex];
  const app   = document.getElementById("app");
  const sk    = stateKey(block.id, zone.id);

  let inner = "";
  switch (zone.type) {
    case "vocab":     inner = renderVocab(zone, sk);     break;
    case "quiz":      inner = renderQuiz(zone, sk);       break;
    case "charmap":   inner = renderCharmap(zone, sk);    break;
    case "craft":     inner = renderCraft(zone, sk);      break;
    case "rewrite":   inner = renderRewrite(zone, sk);    break;
    case "creative":  inner = renderCreative(zone, sk);   break;
    case "extension": inner = renderExtension(zone, sk);  break;
    default:          inner = renderGeneric(zone, sk);    break;
  }

  app.innerHTML = `
    <section class="zone" style="opacity:0">
      <div class="zone-header">
        <div class="zone-subtitle">${zone.subtitle || ""}</div>
        <h2>${zone.title}</h2>
        ${zone.teacherNote ? `<div class="zone-teacher-note">${zone.teacherNote}</div>` : ""}
      </div>
      ${inner}
    </section>`;

  const section = app.querySelector(".zone");
  wireZone(section, zone, block, sk);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    section.classList.add("active");
    section.style.transition = "opacity 180ms ease";
    section.style.opacity    = "1";
  }));
}

// ═══════════════════════════════════════════════════════
// RENDERERS — each takes (zone, sk) where sk = state key
// ═══════════════════════════════════════════════════════

function renderVocab(zone, sk) {
  const cards = zone.words.map((w, i) => `
    <div class="vocab-card" data-index="${i}">
      <div class="vocab-front">
        <div class="vocab-word">${w.word}</div>
        <div class="vocab-hint">${w.hint} — tap to reveal</div>
      </div>
      <div class="vocab-back">
        <div class="vocab-word">${w.word}</div>
        <div class="vocab-def">${w.def}</div>
      </div>
    </div>`).join("");

  const saved = (zoneState[sk] || {}).text || "";
  return `
    <div class="vocab-grid">${cards}</div>
    <div class="surface-divider"></div>
    <div class="open-write-label">Use one of these words in a sentence of your own:</div>
    <textarea id="ta-${sk}" class="thinking-area" placeholder="e.g. The congregation gathered despite the rain…">${saved}</textarea>
    <div class="word-count">0 words</div>`;
}

function renderQuiz(zone, sk) {
  const saved = (zoneState[sk] || {}).answers || {};
  const qs = zone.questions.map((q, qi) => {
    const answered = saved[qi] !== undefined ? saved[qi] : undefined;
    const opts = q.opts.map((o, oi) => {
      let cls = "opt-btn";
      if (answered !== undefined) {
        if (oi === q.correct)   cls += " correct";
        else if (oi === answered) cls += " wrong";
        else                    cls += " spent";
      }
      return `<button class="${cls}" data-qi="${qi}" data-oi="${oi}" ${answered !== undefined ? "disabled" : ""}>${o}</button>`;
    }).join("");

    const feedback = answered !== undefined
      ? `<div class="feedback ${answered === q.correct ? "fb-correct" : "fb-wrong"}">
           ${answered === q.correct ? "✓ Correct — " : "✗ Not quite — "}${q.explain}
         </div>`
      : `<div class="feedback"></div>`;

    return `
      <div class="quiz-q" id="qq-${sk}-${qi}">
        <p><span class="q-num">${qi + 1}.</span> ${q.q}</p>
        <div class="options">${opts}</div>
        ${feedback}
      </div>`;
  }).join("");

  const answers = (zoneState[sk] || {}).answers || {};
  const allAnswered = Object.keys(answers).length === zone.questions.length;
  const score = allAnswered
    ? Object.entries(answers).filter(([qi, oi]) => oi === zone.questions[+qi].correct).length : 0;
  const scoreBadge = allAnswered
    ? `<div class="score-line">Score: <strong>${score} / ${zone.questions.length}</strong></div>` : "";

  return `<div class="quiz-wrap">${qs}${scoreBadge}</div>`;
}

function renderCharmap(zone, sk) {
  const nodes = zone.characters.map((c, i) => `
    <div class="char-node" data-ci="${i}">
      <div class="char-initial">${c.initial || c.name[0]}</div>
      <div class="char-name">${c.name}</div>
      <div class="char-role">${c.role}</div>
    </div>`).join("");

  const saved = (zoneState[sk] || {}).text || "";
  return `
    <div class="char-grid">${nodes}</div>
    <div class="char-expand-panel" id="char-panel-${sk}"></div>
    <div class="surface-divider"></div>
    <div class="open-write-label">${zone.prompt}</div>
    <textarea id="ta-${sk}" class="thinking-area" placeholder="Write your thoughts here…">${saved}</textarea>
    <div class="word-count">0 words</div>`;
}

function renderCraft(zone, sk) {
  const blocks = zone.similes.map((s, si) => {
    const quoted = s.quote.replace(s.highlight, `<span class="craft-highlight">${s.highlight}</span>`);
    const savedText = ((zoneState[sk] || {}).crafts || {})[si] || "";
    return `
      <div class="craft-block surface-dense">
        <div class="craft-quote">"${quoted}"</div>
        <div class="craft-question">${s.question}</div>
        <textarea id="ta-${sk}-${si}" class="thinking-area craft-ta" placeholder="Your analysis…" data-si="${si}">${savedText}</textarea>
        <button class="reveal-btn" data-si="${si}">What DiCamillo means ↓</button>
        <div class="craft-answer" id="craft-ans-${sk}-${si}">${s.answer}</div>
      </div>`;
  }).join("");
  return `<div class="craft-wrap">${blocks}</div>`;
}

function renderRewrite(zone, sk) {
  const saved = (zoneState[sk] || {}).rewrites || {};
  const tasks = zone.tasks.map(t => `
    <div class="rewrite-block surface-dense">
      <div class="rewrite-label">${t.label}</div>
      <div class="rewrite-instruction">${t.instruction}</div>
      <textarea id="ta-${sk}-${t.id}" class="thinking-area rewrite-ta" placeholder="${t.placeholder}" data-tid="${t.id}">${saved[t.id] || ""}</textarea>
      <button class="reveal-btn rewrite-reveal" data-tid="${t.id}" data-example="${t.example}">See one version ↓</button>
      <div class="rewrite-example" id="rw-ex-${sk}-${t.id}"></div>
    </div>`).join("");

  return `
    <div class="rewrite-source surface-light">
      <div class="rewrite-source-line">"${zone.sourceLine}"</div>
      <div class="rewrite-source-note">${zone.sourceNote}</div>
    </div>
    <div class="rewrite-wrap">${tasks}</div>`;
}

function renderCreative(zone, sk) {
  const chips = zone.chips.map(c =>
    `<button class="prompt-chip" data-prompt="${c}">${c}</button>`).join("");
  const saved = (zoneState[sk] || {}).text || "";
  return `
    <div class="surface-light">
      <div class="entry-prompt">${zone.mainPrompt}</div>
      <div class="chip-row">${chips}</div>
      <textarea id="ta-${sk}" class="thinking-area creative-ta" placeholder="${zone.placeholder}">${saved}</textarea>
      <div class="word-count">0 words</div>
    </div>`;
}

function renderExtension(zone, sk) {
  const qs = zone.questions.map((q, qi) => {
    const saved = ((zoneState[sk] || {}).texts || {})[qi] || "";
    return `
      <div class="ext-block surface-dense">
        <div class="ext-q-text">${q.q}</div>
        <textarea id="ta-${sk}-${qi}" class="thinking-area ext-ta" placeholder="Your thinking…" data-qi="${qi}">${saved}</textarea>
        <button class="reveal-btn ext-reveal" data-qi="${qi}">One way to think about it ↓</button>
        <div class="ext-answer" id="ext-ans-${sk}-${qi}">${q.reveal}</div>
      </div>`;
  }).join("");
  return `<div class="ext-wrap">${qs}</div>`;
}

function renderGeneric(zone, sk) {
  const saved = zoneState[sk] || {};
  const choiceHtml = zone.choices ? `
    <div class="choice-row">
      ${zone.choices.map(c => `<button class="${saved.choice === c ? "selected" : ""}" data-choice="${c}">${c}</button>`).join("")}
    </div>` : "";
  return `
    <div class="zone-prompt">${zone.prompt || ""}</div>
    ${choiceHtml}
    <div class="open-write-label">Your thoughts</div>
    <textarea id="ta-${sk}" class="thinking-area" placeholder="Write a short thought…">${saved.text || ""}</textarea>
    <div class="word-count">0 words</div>`;
}

// ═══════════════════════════════════════════════════════
// WIRE-UP
// ═══════════════════════════════════════════════════════
function wireZone(section, zone, block, sk) {

  // Word count
  section.querySelectorAll("textarea").forEach(ta => {
    const counter = ta.nextElementSibling;
    const update  = () => {
      const words = ta.value.trim().split(/\s+/).filter(Boolean).length;
      if (counter && counter.classList.contains("word-count"))
        counter.textContent = words + (words === 1 ? " word" : " words");
    };
    ta.addEventListener("input", update);
    update();
  });

  // ── VOCAB ──
  section.querySelectorAll(".vocab-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("revealed"));
  });
  if (zone.type === "vocab") {
    const ta = document.getElementById(`ta-${sk}`);
    if (ta) ta.addEventListener("input", () => {
      if (!zoneState[sk]) zoneState[sk] = {};
      zoneState[sk].text = ta.value;
      saveToStorage();
    });
  }

  // ── QUIZ ──
  section.querySelectorAll(".opt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const qi  = +btn.dataset.qi;
      const oi  = +btn.dataset.oi;
      const q   = zone.questions[qi];
      const row = section.querySelector(`#qq-${sk}-${qi}`);

      row.querySelectorAll(".opt-btn").forEach(b => {
        b.disabled = true;
        const boi = +b.dataset.oi;
        if (boi === q.correct)  b.classList.add("correct");
        else if (boi === oi)    b.classList.add("wrong");
        else                    b.classList.add("spent");
      });

      const fb = row.querySelector(".feedback");
      const correct = oi === q.correct;
      fb.className   = "feedback " + (correct ? "fb-correct" : "fb-wrong");
      fb.textContent = (correct ? "✓ Correct — " : "✗ Not quite — ") + q.explain;

      if (!zoneState[sk])         zoneState[sk] = {};
      if (!zoneState[sk].answers) zoneState[sk].answers = {};
      zoneState[sk].answers[qi] = oi;
      saveToStorage();

      const answers = zoneState[sk].answers;
      if (Object.keys(answers).length === zone.questions.length) {
        const score = Object.entries(answers)
          .filter(([i, v]) => v === zone.questions[+i].correct).length;
        const wrap  = section.querySelector(".quiz-wrap");
        let badge   = wrap.querySelector(".score-line");
        if (!badge) { badge = document.createElement("div"); badge.className = "score-line"; wrap.appendChild(badge); }
        badge.innerHTML = `Score: <strong>${score} / ${zone.questions.length}</strong>`;
      }
    });
  });

  // ── CHARMAP ──
  section.querySelectorAll(".char-node").forEach(node => {
    node.addEventListener("click", () => {
      const ci    = +node.dataset.ci;
      const c     = zone.characters[ci];
      const panel = section.querySelector(`#char-panel-${sk}`);

      if (panel.dataset.open === String(ci)) {
        panel.dataset.open = "";
        panel.innerHTML    = "";
        section.querySelectorAll(".char-node").forEach(n => n.classList.remove("selected"));
        return;
      }

      section.querySelectorAll(".char-node").forEach(n => n.classList.remove("selected"));
      node.classList.add("selected");
      panel.dataset.open = ci;

      const traits = c.traits.map(t => `<span class="trait-tag">${t}</span>`).join("");
      panel.innerHTML = `
        <div class="char-expand-inner">
          <div class="char-expand-name">${c.initial || c.name[0]} ${c.name} <span class="char-expand-role">${c.role}</span></div>
          <div class="trait-row">${traits}</div>
          <div class="char-think">${c.think}</div>
        </div>`;
    });
  });
  if (zone.type === "charmap") {
    const ta = document.getElementById(`ta-${sk}`);
    if (ta) ta.addEventListener("input", () => {
      if (!zoneState[sk]) zoneState[sk] = {};
      zoneState[sk].text = ta.value;
      saveToStorage();
    });
  }

  // ── CRAFT ──
  if (zone.type === "craft") {
    zone.similes.forEach((_, si) => {
      const ta = document.getElementById(`ta-${sk}-${si}`);
      if (ta) ta.addEventListener("input", () => {
        if (!zoneState[sk])        zoneState[sk] = {};
        if (!zoneState[sk].crafts) zoneState[sk].crafts = {};
        zoneState[sk].crafts[si] = ta.value;
        saveToStorage();
      });
    });
    section.querySelectorAll(".reveal-btn").forEach(btn => {
      if (btn.dataset.si !== undefined) {
        btn.addEventListener("click", () => {
          const ans  = section.querySelector(`#craft-ans-${sk}-${btn.dataset.si}`);
          const open = ans.classList.toggle("visible");
          btn.textContent = open ? "Hide ↑" : "What DiCamillo means ↓";
        });
      }
    });
  }

  // ── REWRITE ──
  if (zone.type === "rewrite") {
    zone.tasks.forEach(t => {
      const ta = document.getElementById(`ta-${sk}-${t.id}`);
      if (ta) ta.addEventListener("input", () => {
        if (!zoneState[sk])          zoneState[sk] = {};
        if (!zoneState[sk].rewrites) zoneState[sk].rewrites = {};
        zoneState[sk].rewrites[t.id] = ta.value;
        saveToStorage();
      });
    });
    section.querySelectorAll(".rewrite-reveal").forEach(btn => {
      btn.addEventListener("click", () => {
        const ex   = section.querySelector(`#rw-ex-${sk}-${btn.dataset.tid}`);
        const open = ex.classList.toggle("visible");
        ex.textContent = open ? btn.dataset.example : "";
        btn.textContent = open ? "Hide ↑" : "See one version ↓";
      });
    });
  }

  // ── CREATIVE ──
  if (zone.type === "creative") {
    const ta = document.getElementById(`ta-${sk}`);
    if (ta) {
      section.querySelectorAll(".prompt-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          ta.value += (ta.value ? "\n" : "") + chip.dataset.prompt + " ";
          ta.focus();
          ta.dispatchEvent(new Event("input"));
        });
      });
      ta.addEventListener("input", () => {
        if (!zoneState[sk]) zoneState[sk] = {};
        zoneState[sk].text = ta.value;
        saveToStorage();
      });
    }
  }

  // ── EXTENSION ──
  if (zone.type === "extension") {
    zone.questions.forEach((_, qi) => {
      const ta = document.getElementById(`ta-${sk}-${qi}`);
      if (ta) ta.addEventListener("input", () => {
        if (!zoneState[sk])       zoneState[sk] = {};
        if (!zoneState[sk].texts) zoneState[sk].texts = {};
        zoneState[sk].texts[qi] = ta.value;
        saveToStorage();
      });
    });
    section.querySelectorAll(".ext-reveal").forEach(btn => {
      btn.addEventListener("click", () => {
        const ans  = section.querySelector(`#ext-ans-${sk}-${btn.dataset.qi}`);
        const open = ans.classList.toggle("visible");
        btn.textContent = open ? "Hide ↑" : "One way to think about it ↓";
      });
    });
  }

  // ── GENERIC ──
  if (zone.type === "generic") {
    section.querySelectorAll(".choice-row button").forEach(btn => {
      btn.addEventListener("click", () => {
        section.querySelectorAll(".choice-row button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        if (!zoneState[sk]) zoneState[sk] = {};
        zoneState[sk].choice = btn.dataset.choice;
        saveToStorage();
      });
    });
    const ta = document.getElementById(`ta-${sk}`);
    if (ta) ta.addEventListener("input", () => {
      if (!zoneState[sk]) zoneState[sk] = {};
      zoneState[sk].text = ta.value;
      saveToStorage();
    });
  }
}

// ═══════════════════════════════════════════════════════
// TEACHER CONTROLS + KEYBOARD
// ═══════════════════════════════════════════════════════
function toggleFocusMode() {
  focusMode = !focusMode;
  document.body.classList.toggle("focus-mode", focusMode);
}

document.addEventListener("keydown", e => {
  if (e.shiftKey && e.key === "U") {
    const next = currentBlockIndex + 1;
    if (next < blocks.length && !unlockedBlocks.has(next)) {
      unlockedBlocks.add(next);
      renderBlockNav();
    }
  }
  if (e.shiftKey && e.key === "T") document.getElementById("teacher-panel").classList.toggle("visible");
  if (e.shiftKey && e.key === "F") toggleFocusMode();
});
    
