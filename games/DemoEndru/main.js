var auxCanv, auxCtx;
function load(){
	$d("buttons",{})
	ddd.canvas = document.getElementById("canv")
	ddd.ctx    = ddd.canvas.getContext("2d")
	auxCanv    = document.getElementById("acanv")
	auxCtx     = auxCanv.getContext("2d")
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

       // alert("x: " + x + "  y: " + y);
}
$d("main",{
	update = function(){

	},
	renderOffest: [0,0],
	render = function(delta,ctx){
		
		/*for (var x = 0; x < 800; x++) {
       			for (var y = 0; y < 600; y++) {
        			var ret = 
        			var i = (y * buffer.width + x) * 4;
	        		buffer.data[i] = ret[0] * 255;
        			buffer.data[i + 1] = ret[1] * 255;
       				buffer.data[i + 2] = ret[2] * 255;
        			buffer.data[i + 3] = ret[3] * 255;*/
        }
    }
	}
})