;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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

},{"../index":2}],2:[function(require,module,exports){
'use strict'

var fs = require('fs');

module.exports = getBuildingsAndCreateSkyline;


function getBuildingsAndCreateSkyline() {
  var buildings = [];
  var input = "1 11 5\n2 6 7\n3 13 9\n12 7 16\n14 3 25\n19 18 22\n23 13 29\n24 4 28\n";
  input.split('\n').forEach(function(chunk) {
    var temp = chunk.split(' ').map(returnInt);
    if (temp.length == 3) buildings.push(temp);
  });
  return buildSkyline(buildings);
}


function buildSkyline(buildings) {
  var basement = createBasement(buildings);
  var filledBasement = fillBasement(basement, buildings);
  return drawSkyline(filledBasement);
}


function fillBasement(basement, buildings) {
  for (var i = 0, len = buildings.length; i < len; i++) {
    var b = buildings[i], l = b[0], h = b[1], r = b[2];
    for (var j = l; j < r; j++) {
      if (h >= basement[j]) basement[j] = h;
    }
  }
  return basement;
}


function drawSkyline(xHeights) {
  var skyline = [];
  for (var x in xHeights) {
    if (x != 0 && xHeights[x] != xHeights[x - 1]) {
      skyline.push(returnInt(x), xHeights[x]);
    }
  }
  return skyline;
}


function createBasement(buildings) {
  var basement = {};
  var xCoords = buildings.map(function(b){ return [b[0],b[2]] });
  var max = Math.max.apply(Math, [].concat.apply([], xCoords));

  for (var i = 0; i <= max; i++) {
    basement[i] = 0;
  };
  return basement;
}


function returnInt(element){
  return parseInt(element, 10);
}

},{"fs":3}],3:[function(require,module,exports){
// nothing to see here... no file methods for the browser

},{}]},{},[1])
;