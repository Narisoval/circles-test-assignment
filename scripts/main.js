import {calculateDistance, findCircleIntersections} from "./mathOperations.js"
import {canvas, ctx, instructionSign, pointListElement,} from "./domElements.js"
import {drawCircleBetweenPoints, drawPoint, point} from "./drawing.js"
import {addEventListeners} from "./eventListeners.js"

const MAX_POINTS_COUNT = 4
const POINT_DRAG_OFFSET = 10
const AB_CIRCLE_COLOR = '#0057B8'
const CD_CIRCLE_COLOR = '#FFD700'
const FIRST_POINT_LETTER = 'A'

let points = []
let dragging = false
let selectedPointIndex = NaN
let intersectionItems = [document.createElement('li'), document.createElement('li')]

addEventListeners()

updateInstructionsSign()

function updateInstructionsSign() {
    instructionSign.textContent = points.length < MAX_POINTS_COUNT ?
        `Choose ${(MAX_POINTS_COUNT - points.length)} points` :
        'Drag the points to adjust the circles'
}

export function onCanvasClick(event) {

    let coordinates = getCanvasCoordinates(event)

    let x = coordinates.x
    let y = coordinates.y

    if (isPointClicked(x, y)) {
        dragging = true
        return
    }

    if (points.length < MAX_POINTS_COUNT) {
        handlePointAdded(x, y)
    }

}

function getCanvasCoordinates(event) {
    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    return {x: x, y: y}
}

function isPointClicked(x, y) {
    for (let i = 0; i < points.length; i++) {
        let currPoint = points[i]

        let distance = calculateDistance(currPoint, {x: x, y: y})
        let pointClickArea = (point.radius * 2) + POINT_DRAG_OFFSET

        if (distance <= pointClickArea) {
            selectedPointIndex = i
            return true
        }
    }
    return false
}

function handlePointAdded(x, y) {
    addPoint(x, y)

    if (points.length === MAX_POINTS_COUNT) {
        redraw()
        addIntersectionItemsToList()
    }

    updateInstructionsSign()
}

function addPoint(x, y) {
    drawPoint(x, y)
    appendPointToLists(x, y)
}

function appendPointToLists(x, y) {
    points.push({x: x, y: y})
    addToPointListElement(points.length - 1)

}

function addToPointListElement(index) {
    let listItem = document.createElement('li')

    listItem.textContent = getPointName(index)

    pointListElement.appendChild(listItem)
}

function getPointName(index) {
    let pointLetter = String.fromCharCode(FIRST_POINT_LETTER.charCodeAt(0) + index)

    let x = points[index].x
    let y = points[index].y

    return `Point ${pointLetter}: ${getFormattedPointCoordinates(x, y)}`
}

function getFormattedPointCoordinates(x, y) {
    return `(${Math.round(x)}, ${Math.round(y)})`
}

function redraw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (points.length === MAX_POINTS_COUNT)
        displayCircles()

    points.forEach(point => drawPoint(point.x, point.y))
}

function addIntersectionItemsToList() {
    intersectionItems.forEach(item => {
        if (!pointListElement.contains(item)) {
            pointListElement.appendChild(item)
        }
    })
}

function displayCircles() {

    let radiusAB = drawCircleBetweenPoints(points[0], points[1], AB_CIRCLE_COLOR)
    let radiusCD = drawCircleBetweenPoints(points[2], points[3], CD_CIRCLE_COLOR)

    let centerAB = points[0]
    let centerCD = points[2]

    let intersectionPoints = findCircleIntersections(centerAB, radiusAB, centerCD, radiusCD)

    updateIntersectionText(intersectionPoints)
}

function updateIntersectionText(intersectionPoints) {
    if (intersectionPoints.length === 0) {
        intersectionItems[0].textContent = 'Intersection 1: none'
        intersectionItems[1].textContent = 'Intersection 2: none'
        return
    }

    intersectionPoints.forEach((point, index) => {
        intersectionItems[index].textContent = `Intersection ${index + 1} ${getFormattedPointCoordinates(point.x, point.y)}`
    })
}

export function onCanvasDrag(event) {
    if (!dragging) return

    let coordinates = getCanvasCoordinates(event)

    let x = coordinates.x
    let y = coordinates.y

    points[selectedPointIndex].x = x
    points[selectedPointIndex].y = y
    changePointDisplayedCoordinates(selectedPointIndex)

    redraw()
}

function changePointDisplayedCoordinates(index) {
    pointListElement.childNodes[index].textContent = getPointName(index)
}

export function onEndCanvasDrag() {
    dragging = false
    selectedPointIndex = null
}

export function onReset() {
    points = []

    while (pointListElement.firstChild) {
        pointListElement.removeChild(pointListElement.firstChild)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateInstructionsSign()
}

export function onWindowResized() {

    resizeCanvas()
    redraw()
}

export function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}