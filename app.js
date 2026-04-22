```javascript
const STATE = { choices:{}, text:{} };
const CLASS = {};

let currentUser = null;

let SHOW_AGG = true;
let FROZEN = false;
let SPOT = null;

let channel = null;
try {
  channel = new BroadcastChannel("bowd-class");
} catch(e) {}

function startSession(){
  const input = document.getElementById("nameInput");
  const name = (input.value || "").trim();
  if(!name) return;

  currentUser = name + "_" + Math.random().toString(36).slice(2,6);

  document.body.classList.remove("locked");

  const screen = document.getElementById("login-screen");
  screen.style.opacity = "0";
  setTimeout(()=> screen.style.display="none", 400);

  render();
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

      ${z.agg ? `<div class="aggregation" id="agg-${z.id}"></div>` : ""}

      <textarea oninput="handleText(this)"></textarea>
    </div>
  `).join("");
}

function setZone(id, btn){
  document.querySelectorAll(".zone").forEach(z=>z.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".zone-nav button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");
}

function selectChoice(el, group){
  const value = el.textContent.trim();

  const buttons = el.parentElement.querySelectorAll("button");
  buttons.forEach(b=>b.classList.remove("active"));
  el.classList.add("active");

  STATE.choices[group] = value;

  if(channel){
    channel.postMessage({ user:currentUser, group, value });
  }
}

function handleText(el){
  const group = el.closest(".zone").id;

  if(!STATE.text[group]) STATE.text[group] = {};
  STATE.text[group][currentUser] = el.value;

  if(channel){
    channel.postMessage({ user:currentUser, group, text:el.value });
  }
}

document.addEventListener("keydown", (e)=>{
  if(e.key.toLowerCase()==="t"){
    const panel = document.getElementById("teacher-panel");
    panel.style.display = panel.style.display==="none" ? "flex" : "none";
  }
});
```
