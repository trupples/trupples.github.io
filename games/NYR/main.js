// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var G = {};
G.title = "New year's run";G.version = "Alpha v0";
G.canvas;G.ctx;G.width=800;G.height=600;
G.time = {elapsed:0, delta:0, last:Date.now(),  now:0};
G.keybd= {keys: new Array(256),keyd: new Array(256),keyu: new Array(256)};
G.ameState = "Logo";
G._assetsLoaded = 0;G._assetsToBeLoaded = 0;

G.preloadImg("res/logo.png");
G.preloadSnd("res/click.wav");

G.preloadImg = function() {
	for (var i = 0; i < arguments.length; i++) {
		var name = arguments[i];
		var img = new Image();
		img.onload = function(){G._assetsLoaded++;}
		img.src = name;G.images[name] = img;
		G._assetsToBeLoaded++;};
}

G.preloadSnd = function() {
	for (var i = 0; i < arguments.length; i++) {
		var name = arguments[i];
		var snd = new Audio();
		snd.oncanplaythrough = function(){G._assetsLoaded++;}
		snd.src = name;G.sounds[name] = snd;
		G._assetsToBeLoaded++;};
}

G.run = function() {
	G.init();
	(function tickLoop(){
		requestAnimFrame(tickLoop);
		G.time.now = Date.now();
		G.time.delta = G.time.now - G.time.last;
		G.time.elapsed += G.time.delta;
		G.render();
		G.update();
		G.time.last = G.time.now;
	})();
}

G.init = function() {
	G.canvas = document.getElementById("canv");
	G.ctx = G.canvas.getContext("2d");
	
	G.canvas.width = G.width;
	G.canvas.height = G.height;
}

G.render = function() {
	G.ctx.clearRect(0, 0, G.width, G.height);
	switch(G.ameState) {
		case "Logo": {
			G.ctx.drawImage(G.images["res/logo.png"], 0, 0);
			break;
		}
	}
}

G.update = function() {
	switch(G.ameState){
		case "Logo": {
			if(G.time.elapsed>3000) G.ameState="Menu";
			if(G.keybd.keys[27])	G.ameState="Menu";
			break;
		}
		case "Menu": {
			
			break;
		}
	}
}
	
	

document.onkeydown = function(e) {
	e = e || event;
	if(!G.keybd.keys[e.keyCode])
		G.keybd.keyd[e.keyCode]=true;
	else
		G.keybd.keyd[e.keyCode]=false;
	G.keybd.keys[e.keyCode] = true;
	G.keybd.keyu[e.keyCode] = false;
}
document.onkeyup = function(e) {
	e = e || event;
	G.keybd.keys[e.keyCode] = false;
	G.keybd.keyd[e.keyCode] = false;
	G.keybd.keyu[e.keyCode] = true;
}
