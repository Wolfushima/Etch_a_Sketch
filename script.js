const gridContent = document.querySelector(".grid-content");

for (let i = 0; i < 16 * 16; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("div-element");
    gridContent.appendChild(divElement);
}