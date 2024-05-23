const p2 = document.querySelector(".page.page2");

const machine1 = document.querySelector(".page.page2 .v1");
const machine2 = document.querySelector(".page.page2 .v2");


machine1.addEventListener("click", (e) => {
    p2.classList.add("focus");
    machine2.style.cursor = "pointer";
    machine1.style.cursor = "default";
});

machine2.addEventListener("click", (e) => {
    p2.classList.remove("focus");

    machine1.style.cursor = "pointer";
    machine2.style.cursor = "default";
});

machine2.click();