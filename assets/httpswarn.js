"use strict";

if(location.protocol != "https:") {
	// create box
	let box = document.createElement("div");
	box.innerHTML = "<h2>Oops!</h2><br/>Looks like you're not using https. You should really click this alert box to switch to https (more secure + some code demos don't work without it).";
	
}
