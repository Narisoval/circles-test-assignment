export function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}

export function findCircleIntersections(circle1, r0, circle2, r1) {
    let d = calculateDistance(circle1, circle2)

    if (areCirclesSeparate(d, r0, r1) || isOneCircleInsideAnother(d, r0, r1)) {
        return []
    }

    return calculateIntersectionPoints(circle1, circle2, r0, r1, d)
}

function areCirclesSeparate(d, r0, r1) {
    return d > r0 + r1
}

function isOneCircleInsideAnother(d, r0, r1) {
    return d < Math.abs(r0 - r1)
}

function calculateIntersectionPoints(circle1, circle2, r1, r2, d) {
    let distanceRatio = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(d, 2)) / (2 * d)
    let perpendicularHeight = Math.sqrt(Math.pow(r1, 2) - Math.pow(distanceRatio, 2))

    let baseX = circle1.x + distanceRatio * (circle2.x - circle1.x) / d
    let baseY = circle1.y + distanceRatio * (circle2.y - circle1.y) / d

    let intersectionPointA = {
        x: baseX + perpendicularHeight * (circle2.y - circle1.y) / d,
        y: baseY - perpendicularHeight * (circle2.x - circle1.x) / d
    }

    let intersectionPointB = {
        x: baseX - perpendicularHeight * (circle2.y - circle1.y) / d,
        y: baseY + perpendicularHeight * (circle2.x - circle1.x) / d
    }

    return [intersectionPointA, intersectionPointB]
}