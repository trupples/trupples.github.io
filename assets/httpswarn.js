"use strict";

if(location.protocol != "https:") {
	let box = document.createElement("div");
	box.innerHTML = "<h2>Oops, you're not using https!</h2>" +
					"You should really click this alert box to switch over to https (more secure + some code demos don't work without it).";
	box.id = "https-warning";
	box.classList.add("center-column");
	box.addEventListener("click", () => {
		location.href = 'https:' + location.href.substring(location.protocol.length);
	});
	
	document.body.insertBefore(box, document.getElementById("content"));
}
