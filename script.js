const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const numCol = 8;
const numRow = 8;
const gridWidth = 50;
const gridHeight = 50;
const canvasWidth = numCol * gridWidth;
const canvasHeight = numRow * gridHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

run();

function run(){
  setInterval(function(){
    draw();
  }, 50);
}

function draw(){
  context.fillStyle = 'violet';
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}
