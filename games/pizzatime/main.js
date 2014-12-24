//http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var PIZZA = {};
PIZZA.initialised=false;
PIZZA.init = function(){
	PIZZA.initialised = true;
	PIZZA.ctx = document.getElementById("canvas").getContext("2d");
	PIZZA.map = [['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
				];
	PIZZA.nothing = ["You find nothing.",
						"There is nothing over here",
						"\"Hello... hello... hello...\", you hear your voice echoing",
						"Well, that was a waste of 10 seconds :/",
						"You see nothing but the next street.",
						"You see all your friends: nobody",
						"You won't ever find somebody to talk to, not even on this street",
						"You feel lonely"];
	PIZZA.gameover = ["Some homeless persons beat you up and steal your pizza. You lose!",
						"You get abducted by aliens. Game over.",
						"A portal to the abyss opens underneath you. You fall for 20 days and then you starve.",
						"A dog bites you and steals your pizza. End of the game!",
						"You start waiting for HL3. You die of thirst.",
						"A graffiti minecraft creeper blows you up. The end!",
						"You get posessed by a ghost that was haunting that area and then you commit suicide.",
						"You eat the pizza because somebody threatens you to do it. The end."];
	PIZZA.win = ["You win!",
						"Yaay!",
						"Mission acomplished!",
						"Overkill!",
						"Do you even win, bro?",
						"Game over: you won!",
						"Booyah!",
						"You succesfully delivered the pizza to the costumer"];
	PIZZA.people = ["You find some people.",
						"There are some men over here",
						"\"Hi\", you say to the ladies you meet",
						"Well, at least you met somebody.",
						"You encounter some people.",
						"This street is filled with people protesting about pizza delivery.",
						"Wow, so many people hating our pizza on this street.",
						"There is one lonely kid on this street"];
	PIZZA.noaccess = ["You find a \"Resrticted access\" sign.",//
						"An FBI agent tells you to turn around and leave. Suspicious...",
						"You see a fight and run for your safety",
						"A ghost is watching you. You run shivering from fear",
						"You feel it's not safe to walk down that street for some reason.",
						"There is a corpse in the middle of the street. You call the police and run.",
						"The police tells you that you can't go there",
						"You see some aliens and then you turn around: \"Nope!\""];
	PIZZA.isMainStreet = function(x, y) {
		return (x>5&&x<9)||(y>5&&y<9);
	}
	PIZZA.writeStatus = function(s){
		document.getElementById("status4").innerHTML = document.getElementById("status3").innerHTML;
		document.getElementById("status3").innerHTML = document.getElementById("status2").innerHTML;
		document.getElementById("status2").innerHTML = document.getElementById("status1").innerHTML;
		document.getElementById("status1").innerHTML = s;
	}
	PIZZA.n = function() {

	}
	PIZZA.s = function() {

	}
	PIZZA.w = function() {

	}
	PIZZA.e = function() {

	}
	PIZZA.draw = function() {
		PIZZA.ctx.clearRect(0, 0, 300, 300);
		for(i=0;i<15;i++)
			for(j=0;j<15;j++){
				if(PIZZA.map[i][j]=='#')
					PIZZA.ctx.fillRect(j*20+1, i*20+1, 18, 18);
				//if(PIZZA.map[i][j]=="+")
					//PIZZA.ctx.
			}
	}
	
	(function animloop(){
	  requestAnimFrame(animloop);
	  PIZZA.draw();
	})();
}

