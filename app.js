// ===== STATE =====
let studentName = "";

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
      renderZone(i);
    };

    nav.appendChild(btn);
  });
}

// ===== RENDER ZONE =====
function renderZone(index) {
  const app = document.getElementById("app");
  const zone = zones[index];

  app.innerHTML = `
    <section class="zone active">
      <h2>${zone.title}</h2>
      <div>${zone.prompt}</div>

      <div class="choice-row">
        ${zone.choices.map(c => `<button>${c}</button>`).join("")}
      </div>

      <textarea placeholder="Write a short thought..."></textarea>
    </section>
  `;
}
