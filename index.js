'use strict'

var fs = require('fs');

module.exports = getBuildingsAndCreateSkyline;


function getBuildingsAndCreateSkyline() {
  var buildings = [];
  var input = fs.readFileSync(__dirname + '/buildings.txt', {encoding: 'utf8'});
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
