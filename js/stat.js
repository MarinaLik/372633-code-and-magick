'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HISTOGRAM_HEIGTH = 150;
var BAR_WIDTH = 40;
var GAP = 50;
var FONT = '16px PT Mono';
var LINE_HEIGHT = 20;

window.renderStatistics = function (ctx, names, times) {

// контрольные точки для кривых Безье, используются при рисовании облака: 4 кривых по 3 точки = 12 точек (без начальной), расстояние между точками 35 = ширина облака / 12.
  var pointsX = [];
  var point = 0;
  for (var i = 1; i < 12; i++) {
    point = CLOUD_X + 35 * i;
    pointsX.push(point);
  }

  var drawCloud = function (x, y, offset, y2, y3, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(pointsX[0], y - 10, pointsX[1], y - 10, pointsX[2], y);
    ctx.bezierCurveTo(pointsX[3], y - 10, pointsX[4], y - 10, pointsX[5], y);
    ctx.bezierCurveTo(pointsX[6], y - 10, pointsX[7], y - 10, pointsX[8], y);
    ctx.bezierCurveTo(pointsX[9], y - 10, pointsX[10], y - 10, x + CLOUD_WIDTH, y);
    ctx.lineTo(x + CLOUD_WIDTH, CLOUD_HEIGHT + offset);
    ctx.bezierCurveTo(pointsX[10] + offset, y2, pointsX[9] + offset, y2, pointsX[8] + offset, y3);
    ctx.bezierCurveTo(pointsX[7] + offset, y2, pointsX[6] + offset, y2, pointsX[5] + offset, y3);
    ctx.bezierCurveTo(pointsX[4] + offset, y2, pointsX[3] + offset, y2, pointsX[2] + offset, y3);
    ctx.bezierCurveTo(pointsX[1] + offset, y2, pointsX[0] + offset, y2, x, y3);
    ctx.closePath();
    ctx.fill();
  };

  var drawText = function (text, x, y, color) {
    ctx.fillStyle = color || '#000000';
    ctx.font = FONT;
    ctx.fillText(text, x, y);
  };

  drawCloud(CLOUD_X + 10, CLOUD_Y + 10, 10, CLOUD_Y + 10 + CLOUD_HEIGHT, CLOUD_HEIGHT + 10, 'rgba(0, 0, 0, 0.7)');
  drawCloud(CLOUD_X, CLOUD_Y, 0, CLOUD_Y + CLOUD_HEIGHT, CLOUD_HEIGHT, 'rgb(255, 255, 255)');

  drawText('Ура вы победили!', CLOUD_X + LINE_HEIGHT, LINE_HEIGHT * 2);
  drawText('Список результатов:', CLOUD_X + LINE_HEIGHT, LINE_HEIGHT * 3);

  // расчет максимального времени
  var max = -1;
  for (var j = 0; j < times.length; j++) {
    var time = times[j];
    if (time > max) {
      max = time;
    }
  }

  var step = HISTOGRAM_HEIGTH / max;
  var initialX = CLOUD_X + GAP;
  var initialY = CLOUD_HEIGHT - LINE_HEIGHT * 1.5;

  var randomBlue = function () {
    return 'rgba(0, 0, 255,' + Math.random().toFixed(1) + 1 + ')';
  };
  // отрисовка столбцов гистограммы
  var drawBar = function (x, y, barHeight, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, BAR_WIDTH, barHeight);
  };

  for (i = 0; i < times.length; i++) {
    var barX = initialX + (GAP + BAR_WIDTH) * i;
    var barY = initialY - times[i] * step;

    drawBar(barX, barY, times[i] * step, (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomBlue());
    drawText(Math.round(times[i]), barX, barY - LINE_HEIGHT / 2);
    drawText(names[i], barX, initialY + LINE_HEIGHT);
  }
};
