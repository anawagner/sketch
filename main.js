'use strict';

//helper functions
function random(num){
  return Math.floor(Math.random()*num);
}
function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
function randColor() {
  return rgb(random(255),random(255),random(255));
}
function parsergb(rgbval) {
  return rgbval.replace(/[^\d,]/g, '').split(',');;
}

function createGrid(size, color) {
  //set grid size display to current grid size
  document.getElementById('gridsize').innerHTML = size + "x" + size;
  //set grid size
  const sketchpad = document.getElementById('sketchpad');
  sketchpad.style.setProperty('grid-template-columns', 'repeat(' + size + ', 1fr)');
  sketchpad.style.setProperty('grid-template-rows', 'repeat(' + size + ', 1fr)');

  //set event listeners
  if (color == 'multi')
  {
    sketchpad.onmouseover = function(e) {
      e.target.style.backgroundColor = randColor();
    }
  }
  else if (color == 'shading')
  {
    var cur_color, rgbvalue;
    const shade_factor = 0.9;

    sketchpad.onmouseover = function(e) {
      cur_color = e.target.style.backgroundColor;
      rgbvalue = parsergb(cur_color);

      if (cur_color == 'white' || !rgbvalue)
      {
        e.target.style.backgroundColor = rgb(255 * shade_factor,
                                             255 * shade_factor,
                                             255 * shade_factor);
      }
      else
      {
        e.target.style.backgroundColor = rgb(rgbvalue[0] * shade_factor,
                                             rgbvalue[1] * shade_factor,
                                             rgbvalue[2] * shade_factor);
      }
    }
  }
  else
  {
    sketchpad.onmouseover = function(e) {
      e.target.style.backgroundColor = color;
    }
  }

  //wipe out old grid tiles
  function removeAllTiles(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
  }
  removeAllTiles(sketchpad);

  //create new grid tiles with event listeners
  var i = 0;
  for (i=0; i < size*size; i++) {
    const asquare = document.createElement('div');
    asquare.classList.add('tile');
    asquare.style.backgroundColor = 'white';
    sketchpad.appendChild(asquare);
  }

}

//create default grid
var color = 'black';
var grid_size = 16;
createGrid(grid_size, color);

//buttons actions
document.getElementById('reset').onclick = function() {
  createGrid(grid_size, color);
}
document.getElementById('resize').onclick = function() {
  var grid_size_input = prompt("enter a new grid size (a number between 1 and 100): ", '16');
  if (grid_size_input > 0 && grid_size_input <= 100)
    grid_size = grid_size_input;

  createGrid(grid_size, color);
}
document.getElementById('multicolor').onclick = function() {
  color = 'multi';
  createGrid(grid_size, color);
}
document.getElementById('shading').onclick = function() {
  color = 'shading';
  createGrid(grid_size, color);
}
document.getElementById('black').onclick = function() {
  color = 'black';
  createGrid(grid_size, color);
}
