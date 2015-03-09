/*
 * QUB.JS
 * description: A web game engine developed by FlattenedTesseract
 * copyleft: You can modify and use this program as you wish, as long as you give the freedom that your derivated work can be modified with no restriction
 * structure:
 * +- $d			Obect dictionary
 * +- _				Core
 * |  |
 * |  +- debug
 * |  +- run
 * |  +- keybd
 * |  +- mouse
 * +- ddd			A naive 3D/Graphics spproach
 *     |
 *     +- clip			CLIPping information
 *     +- matrix		MATRIX utils
 */

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function $d(name, val){
	if(typeof $d.dictionary !== 'object')$d.dictionary={}
	if(typeof val !== 'undefined')$d.dictionary[name]=val;
	return $d.dictionary[name]
}

var _ = {
	debug: {},
	run: {
		ticks:0,tps:0,lastSec:Date.now(),lastTick:Date.now(),
		tick: function(){
			_.run.ticks++
			_.run.tps++
			var delta = (Date.now()-_.run.lastTick)/1000
			_.run.lastTick=Date.now()
			while(Date.now()-lastSec>1000){
				lastSec+=1000
				_.debug.tps = _.run.tps
				_.run.tps=0
			}
			for(var obj in $$.dictionary)
				if(typeof obj.update === 'function')
					obj.update(delta)
			ddd.ctx.clearRect(0,0,ddd.canv.width,ddd.canv.height)
			for(var obj in $$.dictionary)
				if(typeof obj.render === 'function')
   					ctx.putImageData(obj.render(delta), obj.renderOffset[0]|0, obj.renderOffset[1]|0);
		}
	},
	keybd: {
	},
	mouse: {
		LMB: {down:false, up:false, hold:false},
		RMB: {down:false, up:false, hold:false},
		MMB: {down:false, up:false, hold:false},
		pos: {x:0, y:0}
	}
}

var ddd = {
	clip:{minDist:0.3,maxDist:10000},
	proect:{
		perspective: function(vertex){return [-(vertex[0]/vertex[2]),(vertex[1]/vertex[2]),(-vertex[2])]},
		orthogonal: function(vertex){return [(vertex[0]),(vertex[1]),-(vertex[2])]}
	},
	matrix:{}
}
ddd.matrix.apply = function(vertex,matrix){
	var vert = [0, 0, 0]
	vert[0] = vertex[0] * matrix[0][0] + vertex[1] * matrix[0][1] + vertex[2] * matrix[0][2] + vertex[3] * matrix[0][3]
	vert[0] = vertex[0] * matrix[1][0] + vertex[1] * matrix[1][1] + vertex[2] * matrix[1][2] + vertex[3] * matrix[1][3]
	vert[0] = vertex[0] * matrix[2][0] + vertex[1] * matrix[2][1] + vertex[2] * matrix[2][2] + vertex[3] * matrix[2][3]
	vert[0] = vertex[0] * matrix[3][0] + vertex[1] * matrix[3][1] + vertex[2] * matrix[3][2] + vertex[3] * matrix[3][3]
	return vert
}
ddd.matrix.translate = function(x,y,z,w){
	x = typeof x !== 'undefined' ? x : 0
	y = typeof y !== 'undefined' ? y : 0
	z = typeof z !== 'undefined' ? z : 0
	w = typeof w !== 'undefined' ? w : 0
	return [[ 1, 0, 0, x],
		[ 0, 1, 0, y],
		[ 0, 0, 1, z],
		[ 0, 0, 0, w]]
}
ddd.matrix.rotateX = function(rad){
	rad = typeof rad !== 'undefined' ? rad : 0
	var c = math.cos(rad),
	    s = math.sin(rad)
	return [[ 1, 0, 0, 0],
		[ 0, c,-s, 0],
		[ 0, s, c, 0],
		[ 0, 0, 0, 1]]
}
ddd.matrix.rotateY = function(rad){
	rad = typeof rad !== 'undefined' ? rad : 0
	var c = math.cos(rad),
	    s = math.sin(rad)
	return [[ c, 0, s, 0],
		[ 0, 1, 0, 0],
		[-s, 0, c, 0],
		[ 0, 0, 0, 1]]
}
ddd.matrix.rotateZ = function(rad){
	rad = typeof rad !== 'undefined' ? rad : 0
	var c = math.cos(rad),
	    s = math.sin(rad)
	return [[ c,-s, 0, 0],
		[ s, c, 0, 0],
		[ 0, 0, 1, 0],
		[ 0, 0, 0, 1]]
}
