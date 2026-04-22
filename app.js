```javascript
// =====================
// GLOBAL STATE
// =====================
const STATE = { choices:{}, text:{} };
const CLASS = {};

let currentUser = null;

let SHOW_AGG = true;
let FROZEN = false;
let SPOT = null;

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
function startSession(){
  const input = document.getElementById("nameInput");
  const name = (input.value || "").trim();
  if(!name) return;

  currentUser = name + "_" + Math.random().toString(36).slice(2,6);

  const saved = localStorage.getItem("bowd_" + name);
  if(saved){
    try {
      const parsed = JSON.parse(saved);
      STATE.choices = parsed.choices || {};
      STATE.text = parsed.text || {};
    } catch(e){}
  }

  document.body.classList.remove("locked");

  const screen = document.getElementById("login-screen");
  screen.style.opacity = "0";
  setTimeout(()=> screen.style.display="none", 400);

  render();

  // rebroadcast own state
  setTimeout(() => {
    Object.entries(STATE.choices).forEach(([group, value]) => {
      if(channel){
        channel.postMessage({ user: currentUser, group, value });
      }
    });
  }, 200);
}

// =====================
// SAVE
// =====================
function saveState(){
  if(!currentUser) return;
  const name = currentUser.split("_")[0];
  localStorage.setItem("bowd_" + name, JSON.stringify({
    choices: STATE.choices,
    text: STATE.text
  }));
}

// =====================
// RENDER
// =====================
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

      <textarea placeholder="Write a short thought..." oninput="handleText(this)"></textarea>
    </div>
  `).join("");

  restoreUI();
  restoreText();
}

// =====================
// CHOICES
// =====================
function selectChoice(el, group){

  const value = el.textContent.trim();
  if(STATE.choices[group] === value) return;

  el.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");

  STATE.choices[group] = value;
  saveState();

  if(!CLASS[group]) CLASS[group] = { choices:{}, text:{} };
  CLASS[group].choices[currentUser] = value;

  updateAggregation(group);

  if(channel){
    channel.postMessage({ user:currentUser, group, value });
  }
}

// =====================
// TEXT
// =====================
function handleText(el){
  const group = el.closest(".zone").id;

  if(!STATE.text[group]) STATE.text[group] = {};
  STATE.text[group][currentUser] = el.value;

  saveState();
}

// =====================
// RECEIVE
// =====================
if(channel){
  channel.onmessage = (e)=>{
    if(FROZEN) return;

    const { user, group, value } = e.data;

    if(user === currentUser) return;

    if(!CLASS[group]) CLASS[group] = { choices:{}, text:{} };

    if(value) CLASS[group].choices[user] = value;

    updateAggregation(group);
  };
}

// =====================
// AGG
// =====================
function updateAggregation(group){
  if(!CLASS[group]) return;

  const counts = {};

  Object.values(CLASS[group].choices).forEach(v=>{
    counts[v] = (counts[v]||0)+1;
  });

  const el = document.getElementById("agg-"+group);
  if(!el || !SHOW_AGG) return;

  el.innerHTML = Object.entries(counts)
    .map(([k,v])=>`<span class="agg-item">${k}: ${v}</span>`)
    .join(" · ");
}

// =====================
// RESTORE
// =====================
function restoreUI(){
  Object.entries(STATE.choices).forEach(([group,val])=>{
    document.querySelectorAll(`#${group} button`).forEach(btn=>{
      if(btn.textContent.trim()===val){
        btn.classList.add("active");
      }
    });
  });
}

function restoreText(){
  Object.entries(STATE.text).forEach(([group,users])=>{
    const el = document.querySelector(`#${group} textarea`);
    if(el && users[currentUser]){
      el.value = users[currentUser];
    }
  });
}

// =====================
// TEACHER
// =====================
function toggleAggregation(){ SHOW_AGG=!SHOW_AGG; }
function freezeAggregation(){ FROZEN=!FROZEN; }
function resetAggregation(){ Object.keys(CLASS).forEach(k=>delete CLASS[k]); }
function clearSpotlight(){}

document.addEventListener("keydown", (e)=>{
  if(e.key.toLowerCase()==="t"){
    const panel = document.getElementById("teacher-panel");
    panel.style.display = panel.style.display==="none" ? "flex" : "none";
  }
});
```
