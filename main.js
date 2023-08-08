let canvas = document.getElementById("canvas")
canvas.height = 400
let context = canvas.getContext("2d");
let w = canvas.width
let h = canvas.height


function setCanvasDimensions ()
{
    if (window.innerWidth === 700) {
        let mobileWidth = 400; // maximum width for mobile 
        canvas.width = mobileWidth - 30;
    }
    canvas.width = window.innerWidth - 60
    canvas.height = 400;
}

setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);


let colorDraw = "black"
let drawWidth = 2
let drawing = false
let clear = document.getElementById("clear")
let undo = document.getElementById("undo")
let coordinates = []
let index = -1

// for lap
canvas.addEventListener("mousedown", start)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", finished)

//for mobile
canvas.addEventListener("touchstart", start)
canvas.addEventListener("touchmove", draw)
canvas.addEventListener("touchend", finished)


function start (e)
{
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    drawing = true
    context.beginPath()
    // get all axis - the space betwen element and body
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    // to draw points
    draw(e)
}

function draw (e)
{
    e.preventDefault();
    if (!drawing) return
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    context.strokeStyle = colorDraw
    context.lineWidth = drawWidth
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
}

function finished ()
{
    e.preventDefault(); 
    context.beginPath()
    drawing = false
    // get all coordinates and push it
    coordinates.push(context.getImageData(0, 0, w, h))
    index++
}

// clearing canvas

clear.addEventListener("click", () => context.clearRect(0, 0, w, h))

undo.addEventListener("click", undoing)

function undoing ()
{
    if (index <= 0) {
        context.clearRect(0, 0, w, h)
    }
    index -= 1
    coordinates.pop()
    // get the all cooridnates without last one
    context.putImageData(coordinates[index], 0, 0)

}

function getColor (color)
{
    colorDraw = color
}

function widthDraw (width)
{
    drawWidth = width
}