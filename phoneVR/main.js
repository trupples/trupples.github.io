window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
var vertices = {};
var cube, cross;
var left, leftCtx, right, rightCtx;
var cam = {pos: {x:0, y:0, z:-5},rot: {x:0, y:0, z:0}, eyeDist: 0.1}
var ccam = cam;
var movement = {x:0,y:0,z:0}, position = {x:0, y:0, z:0};
function mobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
load = function(){
    var realWidth = document.body.clientWidth>document.body.clientHeight?document.body.clientWidth:document.body.clientHeight;
    var realHeight = document.body.clientWidth<document.body.clientHeight?document.body.clientWidth:document.body.clientHeight;
    left = document.getElementById("canvasLeft");leftCtx=left.getContext("2d");
    right = document.getElementById("canvasRight");rightCtx=right.getContext("2d");
    left.width=right.width=realWidth/2;
    left.height=right.height=realHeight;
    if (realWidth==document.body.clientWidth) {
        console.log("MOBILE");
        left.style.top=0;
        left.style.left=0;
        right.style.top=realWidth/2;
        right.style.left=0;
    }else{
        console.log("PC");
        left.style.top=0;
        left.style.left=0;
        right.style.top=0;
        right.style.left=realWidth/2;
    }
    left.aspect = left.width / left.height;
    right.aspect = right.width / right.height;
    left.midd = left.width/2 + left.height/2;
    right.midd = right.width/2 + right.height/2;
	if (!window.DeviceOrientationEvent) throw "DeviceOrientationEvent not supported!";
	else window.addEventListener('deviceorientation', function(evt){
		evt.preventDefault();
        document.getElementById("alpha").innerHTML = evt.alpha;
        document.getElementById("beta").innerHTML = evt.beta;
        document.getElementById("gamma").innerHTML = evt.gamma;
		cam.rot.x = degToRad(evt.alpha);
		cam.rot.y = degToRad(evt.gamma);
		cam.rot.z = degToRad(evt.beta);
	}, false);
	if (!window.DeviceMotionEvent) 		throw "DeviceMotionEvent not supported!";
	else window.addEventListener('devicemotion', function(evt){
		evt.preventDefault();
        document.getElementById("xacc").innerHTML = evt.x;
        document.getElementById("yacc").innerHTML = evt.y;
        document.getElementById("zacc").innerHTML = evt.z;
		movement.x = evt.acceleration.y*Math.cos(cam.rot.y)+evt.acceleration.x*Math.sin(cam.rot.y);
		movement.z = evt.acceleration.x*Math.sin(cam.rot.y)+evt.acceleration.y*Math.cos(cam.rot.y);
        position.x = movement.x>0.1?movement.x:0;
        position.y = movement.y>0.1?movement.y:0;
        position.z = movement.z>0.1?movement.z:0;
        if (position.x*position.x+position.y*position.y+position.z*position.z>1) {
            //cam.pos.x = position.x/1000;
            //cam.pos.z = position.z/1000;
        }
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
    
    cube.faces[0] = [0,1,3,2];  //down
    cube.faces[1] = [4,6,7,5];  //up
    cube.faces[2] = [0,4,6,2];  //back
    cube.faces[3] = [6,7,3,2];  //right
    cube.faces[4] = [5,7,3,1];  //forward
    cube.faces[5] = [4,5,1,0];  //left
    
    cross = {faces:[],vertices:[]}
    
	cross.vertices[0]=[ 0, 0,-1,+1];
	cross.vertices[1]=[ 0, 0,+1,+1];
	cross.vertices[2]=[ 0,-1, 0,+1];
	cross.vertices[3]=[ 0,+1, 0,+1];
	cross.vertices[4]=[-1, 0, 0,+1];
	cross.vertices[5]=[+1, 0, 0,+1];
    
    cross.faces[0] = [1,3,5];
    cross.faces[1] = [1,2,5];
    cross.faces[2] = [0,2,5];
    cross.faces[3] = [0,3,5];
    cross.faces[4] = [0,2,4];
    cross.faces[5] = [0,3,4];
    cross.faces[6] = [1,3,4];
    cross.faces[7] = [1,2,4];
	
	update();
}

update=function(){
    leftCtx.fillStyle="white";
	leftCtx.strokeStyle="black";
    leftCtx.lineWidth=2;
	leftCtx.clearRect(0, 0, 10000, 10000);
    leftCtx.fillRect(left.width-2,0,2,10000);
    rightCtx.fillStyle="white";
	rightCtx.strokeStyle="black";
    rightCtx.lineWidth=2;
	rightCtx.clearRect(0, 0, 10000, 10000);
    rightCtx.fillRect(0,0,2,10000);
    ddd.renderMeshOn2(cube, cam, ddd.rendermode.faces, left, right);
    ddd.renderMeshOn2(cross, cam, ddd.rendermode.faces, left, right);
	window.requestAnimFrame(update);
}
