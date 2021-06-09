let selectedColorEffect = "black";
let clickEffect = magicClick;
let singleColor;
let emptyColor;
let copyColor;
const gridContent = document.querySelector(".grid-content");

///         ---grid functions---         ///
function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const divElement = document.createElement("div");
        divElement.classList.add("div-element");
        gridContent.appendChild(divElement);
        divElement.addEventListener("mousedown", colorDivElement);
        divElement.addEventListener("mouseover", colorDivElement);
    }
    gridContent.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

function gridSizeValue (e) {
    const sliderTextValue = document.querySelector(".slider-text-value")
    sliderTextValue.textContent = e.target.value;
    gridContent.replaceChildren();
    size = e.target.value;
    createGrid(size);
}

function colorDivElement(e) {
    if (e.buttons !== 1) return;
    e.target.style.backgroundColor = colorPicked();
    clickEffect(e);
}

function magicClick(e) {
    e.target.classList.add("magic-click");
    setTimeout(() => {
        e.target.classList.remove("magic-click");
    }, 100);
}

///         ---color functions---         ///
function colorPicked() {
    switch (selectedColorEffect) {
        case "black": return "#000000";
            break;
        case "rainbow": return rainbowColorEffect();
            break;
        case "blueRainbow": return blueRainbowColorEffect();
            break;
        case "singleColor": return singleColor;
            break;
        case "eraser": return "#FFFFFF";
            break;
        case "emptyColor": return emptyColor;
            break;
        case "copyColor": return copyColor;
            break;
    }
}

function rainbowColorEffect() {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    let rainbowColorEffect = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    return rainbowColorEffect;
}

function blueRainbowColorEffect() {
    const randomRed = Math.floor(Math.random() * 200);
    const randomGreen = Math.floor(Math.random() * 200);
    const randomBlue = Math.floor(Math.random() * 512);
    let blueRainbowColorEffect = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    return blueRainbowColorEffect;
}

function randomRedBackground() {
    const randomRedRed = Math.floor(Math.random() * 256);
    const randomRedGreen = Math.floor(Math.random() * 0);
    const randomRedBlue = Math.floor(Math.random() * 1110);
    let red = `rgb(${randomRedRed}, ${randomRedGreen}, ${randomRedBlue})`;    
    return red;
}

function randomBlueBackground() {
    const randomBlueRed = Math.floor(Math.random() * 1110);
    const randomBlueGreen = Math.floor(Math.random() * 0);
    const randomBlueBlue = Math.floor(Math.random() * 256);
    let blue = `rgb(${randomBlueRed}, ${randomBlueGreen}, ${randomBlueBlue})`;
    return blue;
}

function randomGreenBackground() {
    const randomGreenRed = Math.floor(Math.random() * 0);
    const randomGreenGreen = Math.floor(Math.random() * 256);
    const randomGreenBlue = Math.floor(Math.random() * 1110);
    let green = `rgb(${randomGreenRed}, ${randomGreenGreen}, ${randomGreenBlue})`;
    return green;
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
addGlobalEventListener("click", ".blackColor-button", () => { selectedColorEffect = "black"; })
addGlobalEventListener("click", ".rainbow-button", () => { selectedColorEffect = "rainbow"; });
addGlobalEventListener("click", ".blueRainbow-button", () => { selectedColorEffect = "blueRainbow"; })

addGlobalEventListener("input", ".grid-slider", gridSizeValue);
addGlobalEventListener("change", ".magic-click", (e) => { if(e.target.checked === true) { clickEffect = magicClick }
    else clickEffect = () => void(0);
})

addGlobalEventListener("input", ".single-color", (e) => {
    singleColor = e.target.value;
    selectedColorEffect = "singleColor";
})

addGlobalEventListener("click", ".randomizer", () => {
    const colorScheme = ["red", "blue", "green"];
    let randomScheme = colorScheme[Math.floor(Math.random() * 3)];
    const arrayGridContent = Array.from(gridContent.childNodes);
    arrayGridContent.forEach(element => {
        if (randomScheme === "red") { element.style.backgroundColor = randomRedBackground(); }
        if (randomScheme === "blue") { element.style.backgroundColor = randomBlueBackground(); }
        if (randomScheme === "green") { element.style.backgroundColor = randomGreenBackground(); }
    })
})

addGlobalEventListener("click", ".eraser-button", () => { selectedColorEffect = "eraser"; })
addGlobalEventListener("click", ".copy-color", (e) => {
    selectedColorEffect = "emptyColor";
    gridContent.addEventListener("click", (e) => {
        copyColor = e.target.style.backgroundColor;
        selectedColorEffect = "copyColor";
    }, {once:true})
})

createGrid(32);

