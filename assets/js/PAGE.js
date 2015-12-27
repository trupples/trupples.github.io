var PAGE = {};
PAGE.current = 1;
PAGE.pages = ["blog/index.html", "me.html", "projects/index.html"];
PAGE.initPage = function(p) {
	document.getElementById("page_link" + PAGE.current).className = "page_link";
	PAGE.current = p;
	console.log("page_link" + PAGE.current);
	document.getElementById("page_link" + PAGE.current).className = "page_link page_selected";

	document.getElementById("page").src = PAGE.pages[PAGE.current];
}

window.parent.addEventListener('message', function (e) {
	if(e.data == "try_resize") {
		document.getElementById("page").style.height = 0;
		document.getElementById("page").style.height = document.getElementById("page").contentWindow.document.body.scrollHeight + 'px';
	}
}, false);
