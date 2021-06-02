let selectedColorEffect = "black";
let clickEffect = magicClick;
let singleColor;
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
        case "darkRainbow": return darkRainbowColorEffect();
            break;
        case "singleColor": return singleColor;
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

function darkRainbowColorEffect() {
    const randomRed = randomGreen = randomBlue = Math.floor(Math.random() * 200);
    let darkRainbowColorEffect = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    return darkRainbowColorEffect;
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
addGlobalEventListener("click", ".darkRainbow-button", () => { selectedColorEffect = "darkRainbow"; })

addGlobalEventListener("input", ".grid-slider", gridSizeValue);
addGlobalEventListener("change", ".magic-click", (e) => { if(e.target.checked === true) { clickEffect = magicClick }
    else clickEffect = () => void(0);
})

addGlobalEventListener("input", ".single-color", (e) => { singleColor = e.target.value;
    selectedColorEffect = "singleColor";
})

addGlobalEventListener("click", ".randomizer", () => { 
    const arrayGridContent = Array.from(gridContent.childNodes);
    arrayGridContent.forEach(element => {
        element.style.backgroundColor = rainbowColorEffect();
    })
})

createGrid(32);

