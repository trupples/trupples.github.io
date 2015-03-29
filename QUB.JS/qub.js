var qub = {}	//main game engine
var ddd = {}	//graphics stuff

document.onload=qub._load

ddd._init=function(){
	ddd.canvas=document.getElementById("canvas")
	ddd.ctx=ddd.canvas.getContext('2d')
}

qub._load=function(){
	ddd._init()
	if(typeof qub.load === 'function')
		qub.load()
	qub._tick()
}

qub._tick = function() {
	if(typeof qub.tick === 'function')
		qub.tick()
	
}

