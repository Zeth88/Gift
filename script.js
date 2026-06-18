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

    // Restart loader every time page 2 opens
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
