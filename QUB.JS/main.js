window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
document.write("<canvas id='canv' width='500' height='500'></canvas>")
var canv = document.getElementById("canv"),
    ctx = canv.getContext("2d"),
    mouse = {x:0,y:0},
    max_iter=10;
canv.onmousedown = function(event){
	var rect = document.getElementById("canv").getBoundingClientRect();
	mouse.x = event.clientX-rect.left;
	mouse.y = event.clientY-rect.top;
};

function render(){
	var rect = {x:0,y:0,w:500,h:500},
	    next = {x:null,y:null,w:null,h:null};
	for(var i=1;i<=max_iter;i++){
		ctx.strokeStyle="black";
		ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);
		if(mouse.x>=rect.x&&mouse.x<(2*rect.x+rect.y)/3)
			next.x=rect.x;
		else if(mouse.x>=(2*rect.x+rect.y)/2&&mouse.x<(rect.x+2*rect.y)/3)
			next.x=(2*rect.x+rect.y)/3;
		else
			next.x=(rect.x+2*rect.y)/3;
		if(mouse.y>=rect.y&&mouse.y<(2*rect.y+rect.y)/3)
			next.y=rect.y;
		else if(mouse.y>=(2*rect.y+rect.y)/2&&mouse.y<(rect.y+2*rect.y)/3)
			next.y=(2*rect.y+rect.y)/3;
		else
			next.y=(rect.y+2*rect.y)/3;
		rect.w=rect.w/3;
		rect.h=rect.h/3;
		rect.x=next.x;
		rect.y=next.y;
	}
	window.requestAnimFrame(render);
}


