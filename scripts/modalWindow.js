import {
    aboutButton,
    closeButton,
    modal,
} from "./domElements.js"

export function addModalWindowEventListeners() {

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


