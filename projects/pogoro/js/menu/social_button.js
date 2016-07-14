/* js/menu/social_button.js */
/* Handles the resetting of the animation of the social button */
/* Gosh, this was so unnecesarily hard :/ */

var SOCIAL_BUTTON = {};	// Set up a namespace

SOCIAL_BUTTON.replaceIcon = function replaceIcon(parent, name, last) {
	// Delete the old one
	var icon = document.getElementById(name+"_social_icon");
	if(icon) parent.removeChild(icon);

	// Recreate it
	var icon = document.createElement("img");
	icon.src = "img/menu/social_icons/" + name + ".png";
	icon.className = "social_icon";
	icon.id = name + "_social_icon";
	icon.alt = name;
	var index = SOCIAL_BUTTON.icons.indexOf(name);
	icon.style.animationDelay = (index * SOCIAL_BUTTON.animationInterval - last * SOCIAL_BUTTON.fadeAnimationTime) / 1000 + "s";
	parent.appendChild(icon);
}

SOCIAL_BUTTON.check = function check() {	// The actual stuff
	var now = Date.now(),
		last = SOCIAL_BUTTON.lastTime,
		cycleTime = SOCIAL_BUTTON.animationInterval * SOCIAL_BUTTON.icons.length;

	if(now - last > cycleTime) {
		SOCIAL_BUTTON.lastTime = now;

		var parent = document.getElementById("social_button");

		for(var i=0; i<SOCIAL_BUTTON.icons.length-1; i++) {
			SOCIAL_BUTTON.replaceIcon(parent, SOCIAL_BUTTON.icons[i], false);
		}

		setTimeout(function timeout() {
			SOCIAL_BUTTON.replaceIcon(parent, SOCIAL_BUTTON.icons[SOCIAL_BUTTON.icons.length-1], true);
		}, SOCIAL_BUTTON.fadeAnimationTime);
	}
};

SOCIAL_BUTTON.interval = setInterval(SOCIAL_BUTTON.check, 1);	// Set up an interval
SOCIAL_BUTTON.killInterval = function killInterval() { clearInterval(SOCIAL_BUTTON.interval); }	// Emmergency lever

SOCIAL_BUTTON.animationInterval = 3500;	// ms
SOCIAL_BUTTON.fadeAnimationTime = 500; // ms

SOCIAL_BUTTON.icons = ["discord", "facebook"];

SOCIAL_BUTTON.startTime = Date.now(); 
SOCIAL_BUTTON.lastTime = Date.now() - SOCIAL_BUTTON.animationInterval * SOCIAL_BUTTON.icons.length;
