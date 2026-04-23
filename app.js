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
// CHANNEL (optional sync)
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

document.body.classList.remove("locked");

const screen = document.getElementById("login-screen");
screen.style.opacity = "0";
setTimeout(()=> screen.style.display="none", 500);

render();
}

// =====================
// SAVE
// =====================
function saveState(){
if(!currentUser) return;
const name = currentUser.split("*")[0];
localStorage.setItem("bowd*" + name, JSON.stringify({
choices: STATE.choices,
text: STATE.text
}));
}

// =====================
// RENDER
// =====================
function render(){

const nav = document.getElementById("nav");
nav.innerHTML = ZONES.map((z,i)=>`     <button onclick="setZone('${z.id}', this)" class="${i===0?'active':''}">
      ${i+1}     </button>
  `).join("");

const root = document.getElementById("app");

root.innerHTML = ZONES.map((z,i)=>` <div id="${z.id}" class="zone ${i===0?'active':''}"> <h2>${z.title}</h2> <div>${z.prompt}</div>

```
  <div class="choice-row">
    ${z.choices.map(c=>`
      <button onclick="selectChoice(this,'${z.id}')">${c}</button>
    `).join("")}
  </div>

  ${z.agg ? `<div class="aggregation" id="agg-${z.id}"></div>` : ""}

  <textarea 
    placeholder="Write a short thought..."
    oninput="handleText(this)"
  ></textarea>

  ${renderRecall(z)}
</div>
```

`).join("");

restoreUI();
restoreText();
updateRecalls();
}

// =====================
// RECALL
// =====================
function renderRecall(zone){
if(!zone.recall) return "";

const keys = Array.isArray(zone.recall) ? zone.recall : [zone.recall];

return `    <div class="entry-note">
      Earlier: ${keys.map(k =>`<strong id="recall-${k}">—</strong>`).join(" / ")}     </div>
  `;
}

function updateRecalls(){
Object.entries(STATE.choices).forEach(([k,v])=>{
const el = document.getElementById("recall-"+k);
if(el) el.textContent = v;
});
}

// =====================
// NAVIGATION
// =====================
function setZone(id, btn){
document.querySelectorAll(".zone").forEach(z=>z.classList.remove("active"));
document.getElementById(id).classList.add("active");

document.querySelectorAll(".zone-nav button").forEach(b=>b.classList.remove("active"));
if(btn) btn.classList.add("active");
}

// =====================
// CHOICES
// =====================
function selectChoice(el, group){

const value = el.textContent.trim();
if(STATE.choices[group] === value) return;

const buttons = el.parentElement.querySelectorAll("button");
buttons.forEach(b=>b.classList.remove("active"));
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
// TEXT (DEBOUNCED)
// =====================
let textTimer;

function handleText(el){
clearTimeout(textTimer);

textTimer = setTimeout(()=>{
const group = el.closest(".zone").id;

```
if(!STATE.text[group]) STATE.text[group] = {};
STATE.text[group][currentUser] = el.value;

saveState();

if(!CLASS[group]) CLASS[group] = { choices:{}, text:{} };
CLASS[group].text[currentUser] = el.value;

if(channel){
  channel.postMessage({ user:currentUser, group, text:el.value });
}
```

}, 300);
}

// =====================
// RECEIVE
// =====================
if(channel){
channel.onmessage = (e)=>{
if(FROZEN) return;

```
const { user, group, value, text } = e.data;

if(user === currentUser) return;

if(!CLASS[group]) CLASS[group] = { choices:{}, text:{} };

if(value) CLASS[group].choices[user] = value;
if(text) CLASS[group].text[user] = text;

updateAggregation(group);
```

};
}

// =====================
// AGGREGATION
// =====================
function updateAggregation(group){
if(!CLASS[group]) return;

const counts = {};

Object.values(CLASS[group].choices).forEach(v=>{
counts[v] = (counts[v]||0)+1;
});

const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
renderAggregation(group, sorted);
}

function renderAggregation(group, data){
const el = document.getElementById("agg-"+group);
if(!el || !SHOW_AGG) return;

el.innerHTML = data.map(([k,v])=>`     <span class="agg-item" data-val="${k}" onclick="spotlight('${group}','${k}')">
      ${k}: ${v}     </span>
  `).join(" · ");
}

// =====================
// SPOTLIGHT
// =====================
function spotlight(group, value){
SPOT = {group,value};

document.querySelectorAll(`#agg-${group} .agg-item`)
.forEach(el=>{
if(el.dataset.val === value){
el.classList.add("active");
el.classList.remove("dimmed");
} else {
el.classList.remove("active");
el.classList.add("dimmed");
}
});

showResponses(group, value);
}

function clearSpotlight(){
SPOT = null;
document.querySelectorAll(".agg-item").forEach(el=>{
el.classList.remove("active","dimmed");
});
document.getElementById("response-panel").innerHTML = "";
}

// =====================
// RESPONSES
// =====================
function showResponses(group, value){
const panel = document.getElementById("response-panel");

if(!CLASS[group] || !CLASS[group].text){
panel.innerHTML = "";
return;
}

const responses = Object.entries(CLASS[group].choices)
.filter(([u,v])=>v===value)
.map(([u])=>CLASS[group].text[u])
.filter(Boolean);

const shuffled = responses.sort(()=>Math.random()-0.5).slice(0,5);

panel.innerHTML = shuffled.map(r=>`     <div class="response-item">"${r}"</div>
  `).join("");
}

// =====================
// RESPONSE PANEL TOGGLE
// =====================
function toggleResponsePanel(){
const panel = document.getElementById("response-panel");
const btn = document.getElementById("btn-responses");

if(panel.style.display === "none"){
panel.style.display = "block";
btn.textContent = "Hide thoughts";
} else {
panel.style.display = "none";
btn.textContent = "Show thoughts";
}
}

// =====================
// TEACHER CONTROLS
// =====================
function toggleAggregation(){
SHOW_AGG = !SHOW_AGG;
document.querySelectorAll(".aggregation").forEach(el=>{
el.style.display = SHOW_AGG ? "block" : "none";
});

const btn = document.getElementById("btn-agg");
if(btn) btn.textContent = SHOW_AGG ? "Hide responses" : "Show responses";
}

function freezeAggregation(){
FROZEN = !FROZEN;

const btn = document.getElementById("btn-freeze");
if(btn) btn.textContent = FROZEN ? "Unfreeze" : "Freeze";
}

function resetAggregation(){
Object.keys(CLASS).forEach(k=>delete CLASS[k]);
document.querySelectorAll(".aggregation").forEach(el=>el.innerHTML="");
clearSpotlight();
}

// =====================
// RESTORE UI
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
// TEACHER PANEL TOGGLE (T KEY)
// =====================
document.addEventListener("keydown", (e)=>{
if(e.key.toLowerCase()==="t"){
const panel = document.getElementById("teacher-panel");
panel.style.display = panel.style.display==="none" ? "flex" : "none";
}
});
