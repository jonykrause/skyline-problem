var skyline = require('../index')();

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var SCALE = 25;

var maxHeight = Math.max.apply(null, skyline.filter(function(num, i){ if (i % 2 == true) return num }));
var maxWidth = Math.max.apply(null, skyline.filter(function(num, i){ if (i % 2 == false) return num }));


canvas.width = (maxWidth + 1) * SCALE; // leave some padding
canvas.height = (maxHeight + 1) * SCALE;

ctx.beginPath();
ctx.fillText(''+skyline, 0, 10);
ctx.translate(0, canvas.height - 1);
ctx.moveTo(skyline[0], 0);

for (var i = 0, len = skyline.length; i < len; i++) {
  skyline[i] = skyline[i] * SCALE;
  if (i % 2 == true) {
    ctx.lineTo(skyline[i - 1], skyline[i] * -1);
  }
  else {
    ctx.lineTo(skyline[i], skyline[i - 1] * - 1|| 0);
  }
}

ctx.stroke();
