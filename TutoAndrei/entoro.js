window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
var canv, ctx, interval, startupCode="", repeatCode=""
function load(){
	canv=document.getElementById('canv');
	ctx=canv.getContext('2d');
	document.body.onerror=function(errorMsg, url, lineNumber){
		echo(errorMsg+" line:"+lineNumber);
		clearInterval(interval)
	}
	document.getElementById("startupcode").keydown = function(ev) {
		var keyCode = ev.keyCode || ev.which;
		if (keyCode == 9) {
			ev.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;
			var val = this.value;
			var selected = val.substring(start, end);
			var re, count;
		}
	if(ev.shiftKey) {
		re = /^\t/gm;
		count = -selected.match(re).length;
		this.value = val.substring(0, start) + selected.replace(re, '') + val.substring(end);
		// todo: add support for shift-tabbing without a selection
		} else {
		re = /^/gm;
		count = selected.match(re).length;
		this.value = val.substring(0, start) + selected.replace(re, '\t') + val.substring(end);
		}

	if(start === end) {
		this.selectionStart = end + count;
	} else {
		this.selectionStart = start;
	}

		this.selectionEnd = end + count;
	}
	document.getElementById("repeatcode").keydown = document.getElementById("startupcode").keydown
}

function punct(x,y){
	ctx.fillRect(x, y, 1, 1);
}
function dreptunghi(mode, x, y, w, h){
	if(mode=="linie")
		ctx.strokeRect(x, y, w, h)
	else
		ctx.fillRect(x, y, w, h)
}
function linie(x1, y1, x2, y2){
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}
function sterge(){
	ctx.clearRect(0, 0, 400, 300)
}
function culoare(linie, pata){
	if(typeof linie !== 'undefined')
		ctx.strokeStyle=linie;
	if(typeof pata !== 'undefined')
		ctx.fillStyle=pata;
}
function fundal(stil){
	document.getElementById("canv").style.backgroundColor=stil
}
function echo(entry){
	document.getElementById("console").innerHTML=document.getElementById("console").innerHTML+"\n"+entry
}
function cls(){
	document.getElementById("console").innerHTML=''
}