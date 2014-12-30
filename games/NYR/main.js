// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


// usage:
// instead of setInterval(render, 16) ....

//(function animloop(){
//  requestAnimFrame(animloop);
//  render();
//})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.


var G = {};
G.title = "New year's run";
G.version = "Alpha v0";
G.canvas;
G.ctx;

G.run = function() {
	G.init();
	(function tickLoop(){
		requestAnimFrame(tickLoop);
		G.render();
		G.update();
	})();
}

G.init = function() {
	G.canvas = document.getElementById("canv");
	G.ctx = G.canvas.getContext("2d");
}

G.render = function() {
	
}
G.update = function() {

}

body.onload = G.run;

