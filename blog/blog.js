var blog = {};

blog.page = 0;
blog.entriesPerPage = 3;
blog.entryCount = 4;

blog.setEntries = function() {
	var epp = blog.entriesPerPage; // we need a copy
	var start = (blog.page - 1) * epp + 1;
	var end = start + epp - 1;

	if(end > blog.entryCount) {	// last page is incomplete
		epp = blog.entryCount - start + 1;
	}

	for(var i = 1; i <= blog.entriesPerPage; i++) {	// Clear the entries from last page (this is a problem when you have an incomplete page and you see the posts from the last page)
		document.getElementById("ent_"+i).src = ""
	}

	for(var i = 1; i <= epp; i++) {
		var ifr = document.getElementById("ent_"+i)

		var entryID = blog.entryCount - (i + start - 1) + 1;
		ifr.src = "entries/"+entryID+".html";

		ifr.onload = function(){iframe_stuff(this);}
	}
}

blog.olderPage = function() {
	var firstEntryOnNextPage = blog.page * blog.entriesPerPage;
	if(firstEntryOnNextPage > blog.entryCount) return;
	blog.page++;
	blog.setEntries();
	document.getElementById("page_number").innerHTML = "Page "+blog.page;
}

blog.newerPage = function() {
	if(blog.page == 1) return;	// no newer pages
	blog.page--;
	blog.setEntries();
	document.getElementById("page_number").innerHTML = "Page "+blog.page;
}
