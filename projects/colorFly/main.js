var colors = ["lime", "blue", "red", "green", "purple", "gold", "silver", "cyan", "gray"];
var clicks = 0;
var flipTime = 0.5;
var c11 = document.getElementById("c11"),
	c12 = document.getElementById("c12"),
	c13 = document.getElementById("c13"),
	c21 = document.getElementById("c21"),
	c22 = document.getElementById("c22"),
	c23 = document.getElementById("c23"),
	c31 = document.getElementById("c31"),
	c32 = document.getElementById("c32"),
	c33 = document.getElementById("c33");
	
function setRandom(id){
	setColor(id, colors[Math.floor(Math.random()*9)]);
}
	
function setColor(id, color) {
	flipAnim(id);
	eval("setTimeout(function() {"+
		 "document.getElementById(id).style.backgroundColor = '"+color+"';"+
		 "if(c11.style.backgroundColor==c12.style.backgroundColor"+
			"&& c11.style.backgroundColor==c13.style.backgroundColor"+
			"&& c11.style.backgroundColor==c21.style.backgroundColor"+
			"&& c11.style.backgroundColor==c22.style.backgroundColor"+
			"&& c11.style.backgroundColor==c23.style.backgroundColor"+
			"&& c11.style.backgroundColor==c31.style.backgroundColor"+
			"&& c11.style.backgroundColor==c32.style.backgroundColor"+
			"&& c11.style.backgroundColor==c33.style.backgroundColor)"+
			"win();"+
		"},flipTime*500);");
}

function setText(id, text, color, style, size, fontFamily, y) {
    document.getElementById(id).getContext("2d").textAlign = 'center';
    document.getElementById(id).getContext("2d").font = style + " " + size + "px '"+ fontFamily + "'";
	flipAnim(id);
	eval("setTimeout(function() {"+
		"var ctx = document.getElementById(id).getContext('2d');"+
		"ctx.fillText(text, document.getElementById(id).width/2, "+y+");},flipTime*500);");
}

function cl(id){document.getElementById(id).getContext("2d").clearRect(0,0,200,200);}

function setImage(id, image, x, y) {
	flipAnim(id);
	eval("setTimeout(function() {"+
		"var ctx = document.getElementById(id).getContext('2d');ctx.clearRect(0,0,200,200);"+
		"ctx.drawImage("+image+", -7.5, -7.5, 185, 185);},flipTime*500);");
}

function flipAnim(id){
	var elem = document.getElementById(id);
	elem.style.animation = "flip "+flipTime+"s 1";
	elem.style.WebkitAnimation = "flip "+flipTime+"s 1";
	setTimeout(function(){
		elem.style.animation=elem.style.WebkitAnimation= "";
	},flipTime*1000);
}

function win(){
	cl("c12");
	cl("c33");
	cl("c31");
	cl("c22");
	setImage("c12",'document.getElementById("winTitle")',0,0);
	setImage("c33",'document.getElementById("fbLogoImage")',0,0);
	setColor("c31","lime");
	setImage("c31",'document.getElementById("retryImage")',0,0);
	setText("c22",clicks,"black","bold",60,'Open sans',60);
	setText("c22","clicks","black","bold",60,'Open sans',120);
	
	c11.onclick = function(){};
	c12.onclick = function(){};
	c13.onclick = function(){};
	c21.onclick = function(){};
	c22.onclick = function(){};
	c23.onclick = function(){};
	c31.onclick = function(){						//RESET GAME	
		clicks=0;
	
		c11.getContext("2d").clearRect(0,0,200,200);setRandom("c11");
		c12.getContext("2d").clearRect(0,0,200,200);setRandom("c21");
		c13.getContext("2d").clearRect(0,0,200,200);setRandom("c31");
		c21.getContext("2d").clearRect(0,0,200,200);setRandom("c12");
		c22.getContext("2d").clearRect(0,0,200,200);setRandom("c22");
		c23.getContext("2d").clearRect(0,0,200,200);setRandom("c32");
		c31.getContext("2d").clearRect(0,0,200,200);setRandom("c13");
		c32.getContext("2d").clearRect(0,0,200,200);setRandom("c23");
		c33.getContext("2d").clearRect(0,0,200,200);setRandom("c33");
		
		c11.onclick = function(){clicks++;setRandom("c11");};
		c12.onclick = function(){clicks++;setRandom("c12");};
		c13.onclick = function(){clicks++;setRandom("c13");};
		c21.onclick = function(){clicks++;setRandom("c21");};
		c22.onclick = function(){clicks++;setRandom("c22");};
		c23.onclick = function(){clicks++;setRandom("c23");};
		c31.onclick = function(){clicks++;setRandom("c31");};
		c32.onclick = function(){clicks++;setRandom("c32");};
		c33.onclick = function(){clicks++;setRandom("c33");};
	};
	c32.onclick = function(){};
	c33.onclick = function(){};
}

setRandom("c11");
setRandom("c21");
setRandom("c31");
setRandom("c12");
setRandom("c22");
setRandom("c32");
setRandom("c13");
setRandom("c23");
setRandom("c33");

c11.onclick = function(){clicks++;setRandom("c11");};
c12.onclick = function(){clicks++;setRandom("c12");};
c13.onclick = function(){clicks++;setRandom("c13");};
c21.onclick = function(){clicks++;setRandom("c21");};
c22.onclick = function(){clicks++;setRandom("c22");};
c23.onclick = function(){clicks++;setRandom("c23");};
c31.onclick = function(){clicks++;setRandom("c31");};
c32.onclick = function(){clicks++;setRandom("c32");};
c33.onclick = function(){clicks++;setRandom("c33");};