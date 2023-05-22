import {ctx} from "./domElements.js"
import {calculateDistance} from "./mathOperations.js"

const CIRCLE_END_ANGLE = Math.PI * 2

const POINT_GLOW_COLOR = 'rgba(0,0,0,0.2)'
const CIRCLE_GLOW_COLOR = 'rgba(0,0,0,0.05)'

const CIRCLE_GLOW_LINE_WIDTH = 15
const POINT_GLOW_LINE_WIDTH = 5

const STROKE_LINE_WIDTH = 7
const STROKE_COLOR = 'rgba(255,255,255,0.3)'

function applyCanvasStyle() {
    ctx.strokeStyle = STROKE_COLOR
    ctx.lineWidth = STROKE_LINE_WIDTH
    ctx.stroke()
}

applyCanvasStyle()

export const point = {
    color: 'black',
    radius: 2.5
}

export function drawPoint(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, point.radius, 0, CIRCLE_END_ANGLE)
    ctx.fillStyle = point.color
    ctx.fill()
    addGlow(POINT_GLOW_COLOR, POINT_GLOW_LINE_WIDTH)
}


export function drawCircleBetweenPoints(point1, point2, color) {
    let circleRadius = calculateDistance(point1, point2)
    drawCircle(point1.x, point1.y, circleRadius, color)
    return circleRadius
}


function addGlow(color, lineWidth) {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.stroke()
}

function drawCircle(x, y, radius, color) {
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, CIRCLE_END_ANGLE)
    ctx.closePath()
    ctx.stroke()
    addGlow(CIRCLE_GLOW_COLOR, CIRCLE_GLOW_LINE_WIDTH)
}
