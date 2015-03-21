window.requestAnimFrame = (function(){return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback, 1000 / 60);};})();
var canv, ctx, interval, startupCode="", repeatCode="",mouse={x:0,y:0},imgBank={}
function load(){
	canv=document.getElementById('canv')
	ctx=canv.getContext('2d')
	document.body.onerror=function(errorMsg, url, lineNumber){
		echo(errorMsg+" line:"+lineNumber)
		clearInterval(interval)
	}
}
function loadImg(name,url){
	var img = new Image()
	img.src=url
	img.onload=function(){imgBank[name]=this}
}
function punct(x,y){
	ctx.fillRect(x, y, 1, 1)
}
function dreptunghi(x, y, w, h){
	ctx.fillRect(x, y, w, h)
}
function dreptunghi_c(x, y, w, h){
	ctx.strokeRect(x, y, w, h)
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
function culoare(contur, unplere){
	if(typeof contur !== 'undefined')
		ctx.strokeStyle=contur
	if(typeof umplere !== 'undefined')
		ctx.fillStyle=umplere
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
function handlemousemove(event) {
	var rect = document.getElementById("canv").getBoundingClientRect()
	mouse.x = event.clientX-rect.left
	mouse.y = event.clientY-rect.top
}

