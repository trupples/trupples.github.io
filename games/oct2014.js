var GAME = {
	//CONSTANT SHIZ
	title: "Defense of the ",
	version: "PreAlpha 1",

	///////////////
	begin: function(){
		GAME.ctx=document.getElementById("gCanv").getContext("2d");
		GAME.ticker=setInterval(GAME.tick,0);
	},
	tick: function(){
		var dt = Date.now()-GAME.lastTime;
		GAME.lastTime=Date.now();
		GAME.update(dt);
		GAME.render(dt);
	},
	update: function(dt){},
	render: function(dt){},
}