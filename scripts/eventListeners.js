import {
    aboutButton,
    canvas,
    closeButton,
    modal,
    resetButton,
} from "./domElements.js"
import {onCanvasClick, onCanvasDrag, onEndCanvasDrag, onReset, onWindowResized, resizeCanvas} from "./main.js";

export function addEventListeners() {
    addWindowEventListeners()
    addModalWindowEventListeners()
    addCanvasEventListeners()
    addResetButtonEventListener()
}

function addWindowEventListeners(){
    window.addEventListener('resize', onWindowResized)
    window.addEventListener('load', resizeCanvas)
}

function addModalWindowEventListeners() {

    aboutButton.addEventListener('click', () => {
        modal.style.display = "block"

        function clickedWhileModalIsOpen(event) {
            if (event.target === modal) {
                modal.style.display = "none"
                window.removeEventListener('click', clickedWhileModalIsOpen)
            }
        }

        window.addEventListener('click', clickedWhileModalIsOpen)
    })


    closeButton.addEventListener('click', () => {
        modal.style.display = "none"
    })
}

function addCanvasEventListeners(){
    addCanvasMouseEventListeners()
    addCanvasTouchEventListeners()
}

function addCanvasMouseEventListeners(){
    canvas.addEventListener('mousedown', onCanvasClick)
    canvas.addEventListener('mousemove', onCanvasDrag)
    canvas.addEventListener('mouseup', onEndCanvasDrag)
}

function addCanvasTouchEventListeners(){

    canvas.addEventListener("touchstart", (event) => {
        event.preventDefault();

        let touch = event.touches[0];
        let mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        })
        canvas.dispatchEvent(mouseEvent);
    }, false)

    canvas.addEventListener("touchmove", (event) => {
        let touch = event.touches[0];
        let mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false)

    canvas.addEventListener("touchend", () => {
        let mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false)
}

function addResetButtonEventListener(){
    resetButton.addEventListener('click', onReset)
}



