const gridContent = document.querySelector(".grid-content");
const clearButton = document.querySelector(".clear-button").addEventListener("click", () => {
    const arrayGridContent = Array.from(gridContent.childNodes);
    arrayGridContent.forEach(element => {
        element.style.backgroundColor = "white";
    });
});

for (let i = 0; i < 16 * 16; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("div-element");
    gridContent.appendChild(divElement);
    divElement.addEventListener("mousemove", () => {
        divElement.style.backgroundColor = "rgb(0,0,10)";
    })
}
