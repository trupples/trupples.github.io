/* js/page.js */
/* Handles page switching */

/* DOM class manipulation */
/* http://jaketrent.com/post/addremove-classes-raw-javascript */
function hasClas(el, className) {
	if(!el) return false;
	if (el.classList)
		return el.classList.contains(className);
	else
		return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|&)"));
}

function addClass(el, className) {
	if(!el) return;
	if (el.classList)
		el.classList.add(className);
	else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
	if(!el) return;
	if (el.classList)
		el.classList.remove(className);
	else if (hasClass(el, className)) {
		var reg = new RegExp("(\\s|^)" + className + "(\\s|&)");
		el.className = el.className.replace(reg, ' ');
	}
}

/* My stuff */

var PAGE = {}	// Set up a namespace

PAGE.pages = ["menu", "social", "forum", "o1", "o2", "o3", "o4"];

PAGE.onload = function page_onload() {
	for (var i=0; i<PAGE.pages.length; i++) {
		var page = document.getElementById(PAGE.pages[i]);
		page.style.zIndex = -i * 1000;
	};
}

PAGE.switch_to = function switch_to(pageName) {
	var page = document.getElementById(pageName);
	var currentPage = document.getElementsByClassName("big")[0];
	var targetPageIndex = PAGE.pages.indexOf(pageName);
	var currentPageIndex = PAGE.pages.indexOf(currentPage.id);

	if(targetPageIndex > currentPageIndex) {
		for(var i=currentPageIndex; i<targetPageIndex; i++) {	// Gotta hate them functions made from strings >.<
			setTimeout('var p = document.getElementById("'+PAGE.pages[i]+'");removeClass(p, "big");addClass(p, "small");', PAGE.pageFlipTime * (i - currentPageIndex));
		}
	} else if(targetPageIndex < currentPageIndex) {
		for(var i=targetPageIndex; i<currentPageIndex; i++) {
			setTimeout('var p = document.getElementById("'+PAGE.pages[i]+'");removeClass(p, "small");addClass(p, "big");', PAGE.pageFlipTime * (currentPageIndex - i - 1));
		}
	}
}

PAGE.pageFlipTime = 200; // ms
