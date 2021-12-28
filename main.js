var cvs, ctx
var snow = []


window.onload = function() {
    setupCanvas()
    initSnow()
    window.setInterval(updateSnow, 30)
}


function setupCanvas() {
    cvs = document.getElementById('cvs')
    
    cvs.width  = window.innerWidth
    cvs.height = window.innerHeight
    
    ctx = cvs.getContext('2d')
    ctx.fillStyle = '#ffffff'
}


function initSnow() {
    for(let i = 0; i < 150; i++) {
        snow.push(getFlake())
    }
}


function getFlake() {
    return {
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        r: Math.random() * 4 + 1,
        v: { x: 0, y: 1 }
    }
}


function resetFlake(f) {
    f.x = Math.random() * cvs.width
    f.y = -10
    f.r = Math.random() * 4 + 1,
    f.v = { x: 0, y: 1 }
}


function updateSnow() {
    clear()
    var flake
    
    for(let i = 0; i < snow.length; i++) {
        flake = snow[i]
        updateFlake(flake)
        drawFlake(flake)
    }
}


function clear() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}


function updateFlake(f) {
    f.v.x = updateVelocity(f.v.x, 0.2, -0.5, 0.5)
    f.v.y = updateVelocity(f.v.y, 0.2,  0.5, 2)

    updatePosition(f)
}


function updateVelocity(v, range, min, max) {
    v = v + (Math.random() * range) - (range / 2)
    if(v < min) { return min }
    if(v > max) { return max }
    return v
}


function updatePosition(f) {
    f.x += f.v.x
    f.y += f.v.y

    if(f.x > cvs.width || f.y > cvs.height) {
        resetFlake(f)
    }
}


function drawFlake(f) {
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI)
    ctx.fill()
}