let selectedColorEffect = "black";
const gridContent = document.querySelector(".grid-content");

for (let i = 0; i < 36 * 36; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("div-element");
    gridContent.appendChild(divElement);
    divElement.addEventListener("mousedown", colorDivElement);
    divElement.addEventListener("mouseover", colorDivElement);   
}


///         ---functions---          ///
function colorDivElement(e) {
    if (e.buttons !== 1) return;
    e.target.style.backgroundColor = colorPicked();
    neonEffect(e);
}

function neonEffect(e) {
    e.target.classList.add("neon-effect");
    setTimeout(() => {
        e.target.classList.remove("neon-effect");
    }, 100);
}

///         ---color functions---         ///
function colorPicked() {
    switch (selectedColorEffect) {
        case "black": return "#000000";
            break;
        case "rainbow": return rainbowColor();
            break;
    }
}

function rainbowColor() {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    let rainbowColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    return rainbowColor;
}

function clearGrid() {
    const arrayGridContent = Array.from(gridContent.childNodes);
    arrayGridContent.forEach(element => {
        element.style.backgroundColor = "white";
    })
}
///         ---global-event-listener functions---          ///
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) callback(e);
    })
}

addGlobalEventListener("click", ".clear-button", clearGrid);

addGlobalEventListener("click", ".rainbow-button", () => { selectedColorEffect = "rainbow"; });
addGlobalEventListener("click", ".darker-button", () => { selectedColorEffect = "black" })


