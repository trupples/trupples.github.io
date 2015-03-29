window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
var vertices = {}
var cube
var cam = {pos: {x:0, y:0, z:0},rot: {x:0, y:0, z:0}}
var movement = {x:0,y:0,z:0}

load = function(){
	ddd.ctx=document.getElementById("canvas").getContext("2d")
	if (!window.DeviceOrientationEvent) throw "DeviceOrientationEvent not supported!";
	else window.addEventListener('deviceorientation', function(evt){
		evt.preventDefault()
		cam.rot.x = evt.gamma * Math.PI / 180;
		cam.rot.y = -evt.alpha * Math.PI / 180;
		cam.rot.z = evt.beta * Math.PI / 180;
	}, false);
	if (!window.DeviceMotionEvent) 		throw "DeviceMotionEvent not supported!";
	else window.addEventListener('devicemotion', function(evt){
		evt.preventDefault()
		movement.x = evt.acceleration.y*Math.cos(cam.rot.y)+evt.acceleration.x*Math.sin(cam.rot.y);
		movement.z = evt.acceleration.x*Math.sin(cam.rot.y)+evt.acceleration.y*Math.cos(cam.rot.y);
		//cam.pos.x+=movement.x;
		//cam.pos.z+=movement.z;
	}, false);
	cube = {}
	cube.vertices=[ddd.arrToVec([-1,-1,-1,+1]),
						ddd.arrToVec([-1,-1,+1,+1]),
						ddd.arrToVec([+1,-1,-1,+1]),
						ddd.arrToVec([+1,-1,+1,+1]),
						ddd.arrToVec([-1,+1,-1,+1]),
						ddd.arrToVec([-1,+1,+1,+1]),
						ddd.arrToVec([+1,+1,-1,+1]),
						ddd.arrToVec([+1,+1,+1,+1])];
	update();
}
renderMesh=function(mesh){
	var copy = Array.slice(mesh.vertices);
	for(var v of copy){
		console.log(v)
		v = ddd.matrix.apply(v, ddd.matrix.translation(cam.pos));
		v = ddd.matrix.apply(v, ddd.matrix.rotationY(cam.rot.y));
		v = ddd.matrix.apply(v, ddd.matrix.rotationX(cam.rot.x));
		console.log(v)
		var c = ddd.project(v);
		console.log(c)
		throw "";
		x = c.x * 400 + 400;
		y = c.y * 300 + 400;
		z = c.z;
		if (z > ddd.clip.min && z < ddd.clip.max){
			ddd.ctx.fillRect(x,y,100,100);
			ddd.ctx.fillText((v+" -> ["+x+","+y+","+z+"]"),x,y)
		}
	}
}

update=function(){
	ddd.ctx.clearRect(0, 0, 10000, 10000);
	ddd.ctx.fillStyle="white";
	renderMesh(cube);
	ddd.ctx.fillText((cam.pos.x+""),10,10)
	ddd.ctx.fillText((cam.pos.y+""),10,20)
	ddd.ctx.fillText((cam.pos.z+""),10,30)
	ddd.ctx.fillText((cam.rot.x+""),10,40)
	ddd.ctx.fillText((cam.rot.y+""),10,50)
	ddd.ctx.fillText((cam.rot.z+""),10,60)
	window.requestAnimFrame(update);
}