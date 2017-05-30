const treeColor    = '#282112';
const windowColor  = '#4377D3';
const bricksColor  = '#B25627';

function drawWindow(xWind, yWind) {
    context.fillStyle = windowColor;
    context.fillRect(xWind, yWind, 100, 100);

    context.strokeStyle = treeColor;
    context.lineWidth = 4;
    context.strokeRect(xWind, yWind, 100, 100);

    context.beginPath();
    context.moveTo(xWind + 50, yWind + 30);
    context.lineTo(xWind + 50, yWind + 100);
    context.stroke();

    context.beginPath();
    context.moveTo(xWind, yWind + 30);
    context.lineTo(xWind + 100, yWind + 30);
    context.stroke();
}


function drawWindows() {
    drawWindow(300, 220);
    drawWindow(450, 220);
    drawWindow(600, 220);
    drawWindow(300, 370);
    drawWindow(600, 370);
}


function drawHouse() {
    // house
    var houseStartX  = 250;
    var houseStartY  = 200;
    var houseWidth   = 500;
    var houseHeight  = 300;

    context.fillStyle = bricksColor;
    context.lineWidth = 1;
    context.fillRect(houseStartX, houseStartY, houseWidth, houseHeight);

    // draw bricks
    context.strokeStyle = "#000000";

    for (var i = 5; i < houseHeight; i += 5) {
        context.beginPath();
        context.moveTo(houseStartX, houseStartY + i);
        context.lineTo(houseStartX + houseWidth, houseStartY + i);
        context.stroke();
    }

    for (var g = 0; g < houseHeight; g += 10) {
          for (var i = 10; i < houseWidth; i += 10) {
              context.beginPath();
              context.moveTo(houseStartX + i, houseStartY + g);
              context.lineTo(houseStartX + i, houseStartY + g + 5);
              context.stroke();

              context.beginPath();
              context.moveTo(houseStartX + i - 5, houseStartY + g + 5);
              context.lineTo(houseStartX + i - 5, houseStartY + g + 10);
              context.stroke();
          }

          // end brick
          context.beginPath();
          context.moveTo(houseStartX + houseWidth - 5, houseStartY + g + 5);
          context.lineTo(houseStartX + houseWidth - 5, houseStartY + g + 10);
          context.stroke();
    }

    drawWindows();


    // draw trumpet
    context.fillStyle = treeColor;
    context.fillRect(houseStartX + 100, houseStartY - 150, 20, 100);

    context.fillStyle = bricksColor;
    context.fillRect(houseStartX + 90, houseStartY - 160, 40, 20);


    // draw roof
    context.fillStyle = treeColor;
    context.strokeStyle = bricksColor;
    context.lineWidth = 4;

    context.beginPath();

    context.moveTo(houseStartX + (houseWidth / 2), houseStartY - 100);
    context.lineTo(houseStartX - 50, houseStartY); // перемещаемся к координатам (x,y)
    context.lineTo(houseStartX + houseWidth + 50, houseStartY);
    context.lineTo(houseStartX + (houseWidth / 2), houseStartY - 100);

    context.fill();
    context.stroke();
    context.closePath();
}


function drawOneCloud(cloudStartX, cloudStartY) {
    // draw clouds
    context.beginPath();
    context.fillStyle = '#FFFFFF';

    context.moveTo(cloudStartX, cloudStartY);

    context.bezierCurveTo(cloudStartX - 10, cloudStartY - 50, cloudStartX + 50, cloudStartY - 60, cloudStartX + 60, cloudStartY - 10);
    context.bezierCurveTo(cloudStartX + 80, cloudStartY - 30, cloudStartX + 120, cloudStartY - 40, cloudStartX + 150, cloudStartY + 20);
    context.bezierCurveTo(cloudStartX + 170, cloudStartY + 100, cloudStartX + 120, cloudStartY + 50, cloudStartX + 100, cloudStartY + 50);
    context.bezierCurveTo(cloudStartX + 150, cloudStartY + 140, cloudStartX + 80, cloudStartY + 80, cloudStartX + 60, cloudStartY + 40);
    context.bezierCurveTo(cloudStartX + 10, cloudStartY + 80, cloudStartX + 20, cloudStartY + 90, cloudStartX, cloudStartY);


    context.fill();
    context.stroke();
    context.closePath();
}


function drawOneGrass(size, xGrass, yGrass) {
    // size = [0 .. 1]
    context.strokeStyle = "#00f000";
    context.lineWidth = 1;

    for (var i = -15; i < 16; i += 5) {
        context.beginPath();
        context.moveTo(xGrass, yGrass);
        context.lineTo(xGrass + Math.random() * i * size, yGrass + (Math.random() * Math.abs(i) - 26) * size);
        context.stroke();
    }
}


function drawBackground() {
    horizonLine = 250;
    context.fillStyle = '#7D9DF2';
    context.fillRect(0, 0, 1000, horizonLine);

    context.fillStyle = '#6D9C00';
    context.fillRect(0, horizonLine, 1000, 1000 - horizonLine);
}


function drawSmoke() {
    var smoke = document.getElementById("circle");
    var delay = 100;
    var j = 0;
    var top = 30;
    var width = 40;

    var drawDinamicSmoke = function() {
        setTimeout(drawDinamicSmoke, delay);

          if ( j < 10 ) {
              j++;
              top -= 3;
              width -= 4;

              smoke.style.top = top + 'px';
              smoke.style.width = width + 'px';
              smoke.style.opacity = (10 - j) / 10;

          }
          else { clearTimeout(timer) };
    }

    var timer = setTimeout(drawDinamicSmoke, delay);
}


function drawingRabbit() {
    var rabit = document.getElementById("rabit");
    var start = Date.now();
    var delay = 20;
    var g = 9.8;
    var v0 = 50;
    var bottom0 = 200;

    var drawDinamicRabit = function()  {
        setTimeout(drawDinamicRabit, delay);
        var timePassed = Date.now() - start;
        var coordinateY = bottom0 + (v0 * timePassed / 100 - g * timePassed / 100 * timePassed / 100 * 0.5);
        if (coordinateY < bottom0) {
            start = Date.now();
            timePassed = Date.now() - start;
        }
        rabit.style.bottom = coordinateY + 'px';
    }

    var timer = setTimeout(drawDinamicRabit, delay);
}


function drawAll() {
    drawBackground();
    drawingRabbit();

    for (var k = 0; k < 150; k++) {
        drawOneGrass(Math.random(), Math.random() * 1000, Math.random() * 350 + 250);
    }

    var delay = 20,
        i = -100,
        cloudHeoght = [150, 70, 50],
        cloudCoordinates = [123, 634, 943],
        cloudSpeed = [3, 2, 5],
        all = function() {
            setTimeout(all, delay);

            for (var j = 0; j < 3; j++) {
              if ( cloudCoordinates[j] < 1000 ) { cloudCoordinates[j] += cloudSpeed[j] }
              else {
                cloudCoordinates[j] = -100
                cloudHeoght[j] = Math.random() * 150;
                cloudSpeed[j] = Math.random() * 3 + 2;
              };
            }

            horizonLine = 250;
            context.fillStyle = '#7D9DF2';
            context.fillRect(0, 0, 1000, horizonLine);

            for (var j = 0; j < 3; j++) {
                drawOneCloud(cloudCoordinates[j], cloudHeoght[j]);
            }

            drawHouse();
        };

    var timer = setTimeout(all, delay);

    var smoke = document.getElementById("box");
    smoke.addEventListener("click", drawSmoke);


}

// =================================================================================

var elem = document.getElementById('canvas');

if (elem && elem.getContext) {
    var context = elem.getContext('2d');
    if (context) {
        drawAll();
    }
}
