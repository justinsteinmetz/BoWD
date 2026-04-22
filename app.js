const STATE = { choices:{}, text:{} };
let currentUser = null;

function startSession(){

  const input = document.getElementById("nameInput");
  const name = (input.value || "").trim();
  if(!name) return;

  currentUser = name;

  document.body.classList.remove("locked");

  render();
  setZone(ZONES[0].id);

  const screen = document.getElementById("login-screen");
  screen.style.opacity = "0";

  setTimeout(()=>{
    screen.style.display = "none";
  }, 400);
}

function render(){

  const nav = document.getElementById("nav");
  nav.innerHTML = ZONES.map((z,i)=>`
    <button onclick="setZone('${z.id}', this)" class="${i===0?'active':''}">
      ${i+1}
    </button>
  `).join("");

  const root = document.getElementById("app");

  root.innerHTML = ZONES.map((z,i)=>`
    <div id="${z.id}" class="zone ${i===0?'active':''}">
      <h2>${z.title}</h2>
      <div>${z.prompt}</div>

      <div class="choice-row">
        ${z.choices.map(c=>`
          <button onclick="selectChoice(this,'${z.id}')">${c}</button>
        `).join("")}
      </div>

      <textarea placeholder="Write a short thought..."></textarea>
    </div>
  `).join("");
}

function setZone(id, btn){

  document.querySelectorAll(".zone").forEach(z=>{
    z.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".zone-nav button").forEach(b=>{
    b.classList.remove("active");
  });

  if(btn) btn.classList.add("active");
}

function selectChoice(el, group){

  const buttons = el.parentElement.querySelectorAll("button");
  buttons.forEach(b=>b.classList.remove("active"));

  el.classList.add("active");
}
