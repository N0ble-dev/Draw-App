let canvas = document.getElementById("canvas")
canvas.height = 400
let context = canvas.getContext("2d");


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



// for mobile
canvas.addEventListener("touchstart", startTouch)
canvas.addEventListener("touchmove", drawTouch)
canvas.addEventListener("touchend", finishedTouch)

function startTouch(e) {
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    drawing = true
    context.beginPath()
    const touch = e.touches[0]; // Get the first touch point
    context.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop)
    drawTouch(e)
}

function drawTouch(e) {
    if (!drawing) return
    e.preventDefault();
    const touch = e.touches[0];
    context.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop)
    context.strokeStyle = colorDraw
    context.lineWidth = drawWidth
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
}

function finishedTouch() {
    context.beginPath()
    drawing = false
    coordinates.push(context.getImageData(0, 0, canvas.width, canvas.height))
    index++
}

// for lap
canvas.addEventListener("mousedown", start)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", finished)

function start (e)
{
    drawing = true
    context.beginPath()
    // get all axis - the space betwen element and body
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    // to draw points
    draw(e)
    // e.preventDefault(); // Prevent default touch behavior (like scrolling)
}

function draw (e)
{
    if (!drawing) return
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    context.strokeStyle = colorDraw
    context.lineWidth = drawWidth
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
    // e.preventDefault();
}

function finished (e)
{
    // e.preventDefault(); 
    context.beginPath()
    drawing = false
    // get all coordinates and push it
    coordinates.push(context.getImageData(0, 0, canvas.width, canvas.height))
    index++
}

// clearing canvas

clear.addEventListener("click", () => context.clearRect(0, 0, canvas.width, canvas.height))

undo.addEventListener("click", undoing)

function undoing ()
{
    if (index <= 0) {
        context.clearRect(0, 0, canvas.width, canvas.height)
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


let rangeInput = document.getElementById("range");

rangeInput.addEventListener("input", handleRange);

function handleRange() {
    drawWidth=rangeInput.value
}

let saveImg=document.getElementById("download")

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `From-Nabil-App .jpg`;
    link.href = canvas.toDataURL(); // passing canvasData as link href value
    link.click();
});

// Make the loading screen

document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";

    setTimeout(function() {
        loadingScreen.style.display = "none";
    }, 2000);
});
