window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
var vertices = {}
var cube
var cam = {pos: {x:0, y:0, z:0},rot: {x:0, y:0, z:0}}
load = function(){
	ddd.ctx=document.getElementById("canvas").getContext("2d")
	if (!window.DeviceOrientationEvent) throw "DeviceOrientationEvent not supported!";
	else window.addEventListener('deviceorientation', function(evt){
		cam.rot.y = evt.alpha;
		cam.rot.x = evt.gamma;
		cam.rot.z = evt.beta;
	}, false);
	if (!window.DeviceMotionEvent) 		throw "DeviceMotionEvent not supported!";
	else window.addEventListener('devicemotion', function(evt){
		cam.pos.x = cam.pos.x+evt.acceleration.x*Math.cos(cam.rot.y)+evt.acceleration.z*Math.sin(cam.rot.y);
		cam.pos.z = cam.pos.z+evt.acceleration.z*Math.sin(cam.rot.y)+evt.acceleration.x*Math.cos(cam.rot.y);
	}, false);
	cube = ddd.loadObj("# Blender v2.72 (sub 0) OBJ File: ''\n# www.blender.org\nmtllib cube.mtl\no Cube\nv 1.000000 -1.000000 -1.000000\nv 1.000000 -1.000000 1.000000\nv -1.000000 -1.000000 1.000000\nv -1.000000 -1.000000 -1.000000\nv 1.000000 1.000000 -0.999999\nv 0.999999 1.000000 1.000001\nv -1.000000 1.000000 1.000000\nv -1.000000 1.000000 -1.000000\nusemtl Material\ns off\nf 1 2 3 4\nf 5 8 7 6\nf 1 5 6 2\nf 2 6 7 3\nf 3 7 8 4\nf 5 1 4 8\n");
	update();
}
function renderMesh(mesh){
	for(var v in mesh.vertices){
		var vertex = {x:mesh.vertices[v][0]*100, y:mesh.vertices[v][1]*100, z:mesh.vertices[v][2]*100, w:mesh.vertices[v][3]*100}
		vertex = ddd.matrix.apply(vertex, ddd.matrix.translation(cam.pos.x, cam.pos.y, cam.pos.z))
		vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationY(cam.rot.y))
		vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationX(cam.rot.x))
		var c = ddd.project(vertex.x, vertex.y, vertex.z)
		x = c[0] * 400 + 400
		y = c[1] * 300 + 400
		z = c[2]
		if (z > ddd.clip.min && z < ddd.clip.max){
			ddd.ctx.fillRect(x,y,10000/z,10000/z);
			ddd.ctx.fillText((v+" -> ["+x+","+y+","+z+"]"),x,y)
		}
	}
}

update=function(){
	ddd.ctx.clearRect(0, 0, 10000, 10000);
	ddd.ctx.fillStyle="white";
	renderMesh(cube);
	ddd.ctx.fillText(("["+cam.pos.x+","+cam.pos.y+","+cam.pos.z+"]"),10,10)
	ddd.ctx.fillText(("["+cam.rot.x+","+cam.rot.y+","+cam.rot.z+"]"),10,20)
	window.requestAnimFrame(update);
}