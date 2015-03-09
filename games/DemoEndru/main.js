var canvas, ctx;
function load(){
	$d("buttons",{})
	canvas = document.getElementById("canv")
	ctx    = canvas.getContext("2d")
}
function mouseUp(evt){
	var x = new Number();
        var y = new Number();

        if (evt.x != undefined && evt.y != undefined)
        {
          x = evt.x;
          y = evt.y;
        }
        else // Firefox method to get the position
        {
          x = evt.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          y = evt.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
        }

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        alert("x: " + x + "  y: " + y);
}
