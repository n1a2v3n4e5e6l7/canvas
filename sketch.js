var canavs;
var database;
var rand;
var ran, rando;

var drawing = []

function setup() {
    canvas = createCanvas(800, 800);
    canvas.parent('canvascontainer');
    database = firebase.database()
    background(51)
    var clearbutton = select('#clearbutton');

    clearbutton.mousePressed(clearDrawing)

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    rand = random(1, 255);
    ran = random(1, 255);
    rando = random(1, 255);
    stroke(rand, ran, rando);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

 function clearDrawing() {
     db_drawing = []
     var drawingRef = database.ref('drawing')
     drawingRef.set({
         "d": []
     })
 }

function clearDrawing() {
    db_drawing = [];
    var adaRef = database.ref('drawing');
    adaRef.remove()
}