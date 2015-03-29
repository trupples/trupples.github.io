window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
var vertices = {}
var cube
var cam = {pos: {x:0, y:0, z:-5},rot: {x:0, y:0, z:0}}
var movement = {x:0,y:0,z:0}
load = function(){
    document.getElementById("canvas").width = document.body.clientWidth; 
    document.getElementById("canvas").height = document.body.clientHeight;
	ddd.ctx=document.getElementById("canvas").getContext("2d")
	ddd.ctx.rotate(90 * (Math.PI / 180));   
	if (!window.DeviceOrientationEvent) throw "DeviceOrientationEvent not supported!";
	else window.addEventListener('deviceorientation', function(evt){
		evt.preventDefault()
		cam.rot.y = -evt.alpha * Math.PI / 180;
		cam.rot.x = (-evt.gamma-Math.PI) * Math.PI / 180;
		cam.rot.z = evt.beta * Math.PI / 180;
	}, false);
	if (!window.DeviceMotionEvent) 		throw "DeviceMotionEvent not supported!";
	else window.addEventListener('devicemotion', function(evt){
		evt.preventDefault()
		movement.x = evt.acceleration.y*Math.cos(cam.rot.y)+evt.acceleration.x*Math.sin(cam.rot.y);
		movement.z = evt.acceleration.x*Math.sin(cam.rot.y)+evt.acceleration.y*Math.cos(cam.rot.y);
		cam.pos.x = cam.pos.x+movement.x*0/1000;
		cam.pos.z = cam.pos.z+movement.z*0/1000;
	}, false);
	//cube = ddd.loadObj("# Blender v2.72 (sub 0) OBJ File: ''\n# www.blender.org\nmtllib cube.mtl\no Cube\nv 1.000000 -1.000000 -1.000000\nv 1.000000 -1.000000 1.000000\nv -1.000000 -1.000000 1.000000\nv -1.000000 -1.000000 -1.000000\nv 1.000000 1.000000 -0.999999\nv 0.999999 1.000000 1.000001\nv -1.000000 1.000000 1.000000\nv -1.000000 1.000000 -1.000000\nusemtl Material\ns off\nf 1 2 3 4\nf 5 8 7 6\nf 1 5 6 2\nf 2 6 7 3\nf 3 7 8 4\nf 5 1 4 8\n");
	cube = {faces:[],vertices:[]}
	cube.vertices[0]=[-1,-1,-1,+1];
	cube.vertices[1]=[-1,-1,+1,+1];
	cube.vertices[2]=[+1,-1,-1,+1];
	cube.vertices[3]=[+1,-1,+1,+1];
	cube.vertices[4]=[-1,+1,-1,+1];
	cube.vertices[5]=[-1,+1,+1,+1];
	cube.vertices[6]=[+1,+1,-1,+1];
	cube.vertices[7]=[+1,+1,+1,+1];
	
	update();
}
function renderMesh(mesh){
	for(var v in mesh.vertices){
		var vertex = {x:mesh.vertices[v][0], y:mesh.vertices[v][1], z:mesh.vertices[v][2], w:mesh.vertices[v][3]}
		vertex = ddd.matrix.apply(vertex, ddd.matrix.translation(cam.pos.x, cam.pos.y, cam.pos.z))
		vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationY(cam.rot.y))
		vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationX(cam.rot.x))
		var c = ddd.project(vertex.x, vertex.y, vertex.z)
		x = c[0] * 400 + 400
		y = c[1] * 300 + 400
		z = c[2]
		if (z > ddd.clip.min && z < ddd.clip.max){
			ddd.ctx.fillRect(x,y,100/z,100/z);
		}
	}
}

update=function(){
	ddd.ctx.clearRect(0, 0, 10000, 10000);
	ddd.ctx.fillStyle="white";
	renderMesh(cube);
	ddd.ctx.fillText((cam.pos.x+"").substr(0,5),10,10)
	ddd.ctx.fillText((cam.pos.y+"").substr(0,5),10,20)
	ddd.ctx.fillText((cam.pos.z+"").substr(0,5),10,30)
	ddd.ctx.fillText((cam.rot.x+"").substr(0,5),10,40)
	ddd.ctx.fillText((cam.rot.y+"").substr(0,5),10,50)
	ddd.ctx.fillText((cam.rot.z+"").substr(0,5),10,60)
	window.requestAnimFrame(update);
}
