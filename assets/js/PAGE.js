var PAGE = {};
PAGE.pages = ["blog/index.html", "me.html", "projects/index.html"];
PAGE.initPage = function(p) {
	document.getElementById("0").style.fontSize = document.getElementById("1").style.fontSize = document.getElementById("2").style.fontSize = "50%";
	document.getElementById(p).style.fontSize = "100%";
	document.getElementById("pageContents").src = PAGE.pages[p];
}
