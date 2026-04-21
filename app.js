function setZone(id){
  document.querySelectorAll(".zone").forEach(z => z.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".zone-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

function wc(el){
  const words = el.value.trim().split(/\s+/).length;
  console.log(words);
}

function mark(el){
  el.classList.toggle("active");
}
