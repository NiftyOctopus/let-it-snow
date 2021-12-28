var cvs, ctx
var snow = []

const size = { min: 1, max: 5 }

const velocity = {
    x: { target: 0, min: -0.7, max: 0.7 },
    y: { target: 1, min:  0.5, max: 3.0 }
}


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
        snow.push(resetFlake())
    }
}


function resetFlake(flake={}, y=null) {
    flake.x = Math.random() * cvs.width
    flake.y = y ? y : Math.random() * cvs.height
    flake.r = (Math.random() * (size.max - size.min)) + size.min

    const initVY = getInitVelocity(flake.r)

    flake.v = {
        x: velocity.x.target,
        y: initVY, max: initVY * 2
    }

    return flake
}


function getInitVelocity(r) {
    const min = velocity.y.min
    const max = velocity.y.max
    
    const range = max - min
    const frac  = (r - size.min) / (size.max - size.min)

    return min + (frac * range)
}


function updateSnow() {
    clear()
    
    for(let i = 0; i < snow.length; i++) {
        updateFlake(snow[i])
        drawFlake(snow[i])
    }
}


function clear() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}


function updateFlake(f) {
    f.v.x = updateVelocity(f.v, 'x')
    f.v.y = updateVelocity(f.v, 'y')

    updatePosition(f)
}


function updateVelocity(v1, dir) {
    const min = velocity[dir].min
    const max = dir === 'y' ? v1.max : velocity[dir].max
    const rng = (max - min) * 0.2

    v2 = v1[dir] + (Math.random() * rng) - (rng / 2)

    if(v2 < min) { return min }
    if(v2 > max) { return max }
    return v2
}


function updatePosition(f) {
    f.x = f.x + f.v.x
    f.y = f.y + f.v.y

    if(f.x > cvs.width || f.y > cvs.height) {
        f = resetFlake(f, -10)
    }
}


function drawFlake(f) {
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI)
    ctx.fill()
}