// ================= PAGES =================

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

function showPage(index){

if(index < 0 || index >= pages.length) return;

pages.forEach(page => {
    page.classList.remove("active");
});

pages[index].classList.add("active");

current = index;

// Start loader whenever page 2 opens
if(index === 1){
    setTimeout(startLoader,100);
}

}

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

window.goNext = goNext;
window.goPrev = goPrev;

// ================= LOADER =================

let loaderInterval = null;

function startLoader(){

const bar = document.getElementById("progressBar");
const percentage = document.getElementById("percentage");
const message = document.getElementById("beautyMessage");

if(!bar || !percentage || !message) return;

if(loaderInterval){
    clearInterval(loaderInterval);
}

// Reset
bar.style.width = "0%";

percentage.innerHTML = "0%";
percentage.style.fontSize = "18px";

message.innerHTML = "";
message.style.opacity = "0";

let value = 0;

loaderInterval = setInterval(() => {

    value++;

    bar.style.width = value + "%";

    percentage.innerHTML = value + "%";

    percentage.style.fontSize =
        (18 + value * 0.25) + "px";

    if(value >= 100){

        clearInterval(loaderInterval);

        message.innerHTML =
        "✨ You are a certified beauty 😍💖✨";

        message.style.opacity = "1";
    }

},30);

}

// ================= PUZZLE =================

const puzzle =
document.getElementById("puzzle");

let positions = [0,1,2,3,4,5,6,7,8];
let selected = null;

function shuffle(array){

for(let i=array.length-1;i>0;i--){

    const j =
    Math.floor(Math.random()*(i+1));

    [array[i],array[j]] =
    [array[j],array[i]];
}

return array;

}

function initPuzzle(){

do{
    shuffle(positions);
}
while(
    positions.every(
        (value,index)=>
        value===index
    )
);

renderPuzzle();

}

function renderPuzzle(){

if(!puzzle) return;

puzzle.innerHTML = "";

positions.forEach((value,index)=>{

    const piece =
    document.createElement("div");

    piece.classList.add("piece");

    const row =
    Math.floor(value / 3);

    const col =
    value % 3;

    piece.style.backgroundPosition =
    `${-col * 110}px ${-row * 110}px`;

    if(index === selected){
        piece.style.outline =
        "3px solid white";
    }

    piece.onclick =
    () => selectPiece(index);
    puzzle.appendChild(piece);
});

}

function selectPiece(index){

if(selected === null){

    selected = index;

    renderPuzzle();

    return;
}

[positions[selected],positions[index]] =
[positions[index],positions[selected]];

selected = null;

renderPuzzle();

checkPuzzle();

}

function checkPuzzle(){

const solved =
positions.every(
    (value,index)=>
    value===index
);

if(solved){

    const win =
    document.getElementById(
        "puzzleWinMessage"
    );

    if(win){

        typeWriter(
            win,
            "✨ Perfect! You solved it ❤️",
            50
        );
    }
}

}

// ================= TYPEWRITER =================

function typeWriter(
element,
text,
speed = 50
){

element.innerHTML = "";

let i = 0;

function typing(){

    if(i < text.length){

        element.innerHTML +=
        text.charAt(i);

        i++;

        setTimeout(
            typing,
            speed
        );
    }
}

typing();

}

// ================= INIT =================

showPage(0);
initPuzzle();
