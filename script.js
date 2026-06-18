let current = 0;

const pages = [
 document.getElementById("page1"),
 document.getElementById("page2"),
 document.getElementById("page3"),
 document.getElementById("page4"),
 document.getElementById("page5"),
 document.getElementById("page6"),
 document.getElementById("page7")
];

/* ================= PAGE SYSTEM ================= */

function showPage(i){

if(i < 0 || i >= pages.length) return;

pages.forEach(p => p.classList.remove("active"));
pages[i].classList.add("active");

current = i;

/* start loader ONLY when page 2 opens */
if(i === 1){
setTimeout(() => {
startLoader();
}, 100);
}
}

/* NAVIGATION */
function goNext(){
if(current < pages.length - 1){
showPage(current + 1);
}
}

function goPrev(){
if(current > 0){
showPage(current - 1);
}
}

/* expose to HTML */
window.goNext = goNext;
window.goPrev = goPrev;

/* ================= LOADER ================= */

function startLoader(){

const bar = document.getElementById("progressBar");
const text = document.getElementById("percentage");
const msg = document.getElementById("beautyMessage");

if(!bar || !text || !msg){
console.error("Loader elements missing");
return;
}

/* reset */
bar.style.width = "0%";
text.innerText = "0%";
msg.innerHTML = "";
msg.style.opacity = "0";

let val = 0;

let interval = setInterval(() => {

val += Math.max(1, Math.floor((100 - val) * 0.08));

bar.style.width = val + "%";
text.innerText = val + "%";

/* growing text effect */
text.style.fontSize = (18 + val * 0.4) + "px";

if(val >= 100){
clearInterval(interval);

msg.innerHTML = "✨ You are a certified beauty 😍💖✨";
msg.style.opacity = "1";
}

}, 40);
}

/* ================= PUZZLE ================= */

const puzzle = document.getElementById("puzzle");

let pos = [0,1,2,3,4,5,6,7,8];
let first = null;

/* shuffle */
function shuffle(a){
for(let i=a.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1));
[a[i],a[j]]=[a[j],a[i]];
}
return a;
}

/* init puzzle */
function initPuzzle(){

do{
shuffle(pos);
}while(pos.every((v,i)=>v===i));

render();
}

/* render puzzle */
function render(){

puzzle.innerHTML = "";

pos.forEach((v,i)=>{

const d = document.createElement("div");
d.classList.add("piece");

const row = Math.floor(v / 3);
const col = v % 3;

d.style.backgroundPosition = `${-col*110}px ${-row*110}px`;

/* highlight selected */
if(i === first){
d.style.outline = "3px solid white";
d.style.transform = "scale(1.05)";
}

d.onclick = () => select(i);

puzzle.appendChild(d);

});

}

/* select logic */
function select(i){

if(first === null){
first = i;
render();
return;
}

[pos[first], pos[i]] = [pos[i], pos[first]];
first = null;

render();
check();
}

/* check solved */
function check(){

if(pos.every((v,i)=>v===i)){

const msg = document.getElementById("puzzleWinMessage");

if(msg){
typeWriter(msg, "✨ Perfect! You solved it ❤️", 60);
}

}

}

function typeWriter(element, text, speed = 60){

element.innerHTML = "";
let i = 0;

function typing(){

if(i < text.length){
element.innerHTML += text.charAt(i);
i++;
setTimeout(typing, speed);
}

}

typing();
}

/* ================= INIT ================= */

showPage(0);
initPuzzle();
