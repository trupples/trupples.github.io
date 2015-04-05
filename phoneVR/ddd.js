var ddd = {}
ddd.ctx, ddd.canv
ddd.clip = {}
ddd.clip.min = 0.3
ddd.clip.max = 100000000
//http://stackoverflow.com/questions/17885850/how-to-parse-a-string-containing-text-for-a-number-float-in-javascript
function parseSentenceForNumbers(sentence){
    var matches = /(\+|-)?((\d+(\.\d+)?)|(\.\d+))/g.exec(sentence);
    return matches;
}

//PROECTION
ddd.project=function(x, y, z){
	return [-x/z, y/z, -z];
}

//MATRIX SHIT, SON, MATRIX SHIT
ddd.matrix = {}

ddd.matrix.apply=function(vertex, matrix){
	var vert = {}
	var x = vertex.x
	var y = vertex.y
	var z = vertex.z
	var w = vertex.w
	vert.x = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2] + w * matrix[0][3]
	vert.y = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2] + w * matrix[1][3]
	vert.z = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2] + w * matrix[2][3]
	vert.w = x * matrix[3][0] + y * matrix[3][1] + z * matrix[3][2] + w * matrix[3][3]
	return vert
}

//TRANSFORMATION MATRICES
ddd.matrix.translation=function(x, y, z){
	var matrix = [
		[ 1 , 0 , 0 , x ],
		[ 0 , 1 , 0 , y ],
		[ 0 , 0 , 1 , z ],
		[ 0 , 0 , 0 , 1 ],
	];
	return matrix
}

ddd.matrix.rotationX=function(theta){
	var c = Math.cos(theta)
	var s = Math.sin(theta)
	var matrix = [
		[ 1 , 0 , 0 , 0 ],
		[ 0 , c ,-s , 0 ],
		[ 0 , s , c , 0 ],
		[ 0 , 0 , 0 , 1 ],
	];
	return matrix
}
ddd.matrix.rotationY=function(theta){
	var c = Math.cos(theta)
	var s = Math.sin(theta)
	var matrix = [
		[ c , 0 , s , 0 ],
		[ 0 , 1 , 0 , 0 ],
		[-s , 0 , c , 0 ],
		[ 0 , 0 , 0 , 1 ],
	];
	return matrix
}
ddd.matrix.rotationZ=function(theta){
	var c = Math.cos(theta)
	var s = Math.sin(theta)
	var matrix = [
		[ c ,-s , 0 , 0 ],
		[ s , c , 0 , 0 ],
		[ 0 , 0 , 1 , 0 ],
		[ 0 , 0 , 0 , 1 ],
	];
	return matrix
}

//.OBJ FILE LOADING
ddd.loadObj=function(str){
	var mesh = {}
	mesh.vertices = []
	mesh.faces = []
	var lines = str.split('\n')
	for(var line in lines){
		if (/^\s*v/.test(lines[line])) {	//vertex
			var vert = parseSentenceForNumbers(lines[line]);
			vert[0]=parseInt(vert[0]);vert[0]=vert[0]?vert[0]:0;
			vert[1]=parseInt(vert[1]);vert[1]=vert[1]?vert[1]:0;
			vert[2]=parseInt(vert[2]);vert[2]=vert[2]?vert[2]:0;
			vert[3]=parseInt(vert[3]);vert[3]=vert[3]?vert[3]:0;
			mesh.vertices.push(vert);
		}
		if(/^s*f/.test(lines[line])) {	//face
			var face = parseSentenceForNumbers(lines[line]);
			mesh.faces.push(face);
		}
	}
	return mesh
}

//rendermodes
ddd.rendermode={}
ddd.rendermode.points           =   1;

ddd.rendermode.lines            =  11;
ddd.rendermode.line_chain       =  12;
ddd.rendermode.line_loop        =  13;

ddd.rendermode.triangles        =  21;
ddd.rendermode.triangles_strip  =  22;
ddd.rendermode.triangles_fan    =  23;

ddd.rendermode.faces            =  31;

//rendering
ddd.renderMesh=function(mesh,cam,mode){
    var projectedVertices = new Array();
	for(var v in mesh.vertices){
		var vertex = {x:mesh.vertices[v][0], y:mesh.vertices[v][1], z:mesh.vertices[v][2], w:mesh.vertices[v][3]}
		vertex = ddd.matrix.apply(vertex, ddd.matrix.translation(cam.pos.x, cam.pos.y, cam.pos.z))
		vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationY(cam.rot.y))
		vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationX(cam.rot.x))
		//vertex = ddd.matrix.apply(vertex, ddd.matrix.rotationZ(cam.rot.z))
		projectedVertices[projectedVertices.length]=ddd.project(vertex.x, vertex.y, vertex.z);
	}
    
    if (mode===ddd.rendermode.points) {
            v=parseInt(v);
        for (var v in projectedVertices) {
            x = projectedVertices[v][0] * ddd.canv.midd + ddd.canv.width/2
            y = projectedVertices[v][1] * ddd.canv.midd + ddd.canv.height/2
            z = projectedVertices[v][2]
            if (z > ddd.clip.min && z < ddd.clip.max){
                ddd.ctx.fillRect(x,y,10,10);
            }
        }
    }
    
    if (mode===ddd.rendermode.lines) {
        for (var v in projectedVertices) {
            v=parseInt(v);
            if (v%2==0) {
                x1 = projectedVertices[v][0] * ddd.canv.midd + ddd.canv.width/2
                y1 = projectedVertices[v][1] * ddd.canv.midd + ddd.canv.height/2
                z1 = projectedVertices[v][2]
                x2 = projectedVertices[v+1][0] * ddd.canv.midd + ddd.canv.width/2
                y2 = projectedVertices[v+1][1] * ddd.canv.midd + ddd.canv.height/2
                z2 = projectedVertices[v+1][2]
                if ((z1 > ddd.clip.min && z1 < ddd.clip.max)&&(z2 > ddd.clip.min && z2 < ddd.clip.max)){
                    ddd.ctx.beginPath();
                    ddd.ctx.moveTo(x1,y1);
                    ddd.ctx.lineTo(x2,y2);
                    ddd.ctx.closePath();
                    ddd.ctx.strokeStyle="white";
                    ddd.ctx.stroke();
                }
            }
        }
    }
    
    if (mode===ddd.rendermode.lines_chain) {
        var first=true;
        ddd.ctx.beginPath();
        for (var v in projectedVertices) {
            v=parseInt(v);
            x = projectedVertices[v][0] * ddd.canv.midd + ddd.canv.width/2
            y = projectedVertices[v][1] * ddd.canv.midd + ddd.canv.height/2
            z = projectedVertices[v][2]
            if (z < ddd.clip.min || z > ddd.clip.max){
                return;
            }else{
                if (first) {
                    ddd.ctx.moveTo(x1,y1);
                    first=false;
                }else{
                    ddd.ctx.lineTo(x2,y2);
                }
            }
        }
        ddd.ctx.strokeStyle="white";
        ddd.ctx.stroke();
    }
    
    if (mode===ddd.rendermode.lines_loop) {
        ddd.ctx.beginPath();
        var first=true;
        for (var v in projectedVertices) {
            v=parseInt(v);
            x = projectedVertices[v][0] * ddd.canv.midd + ddd.canv.width/2
            y = projectedVertices[v][1] * ddd.canv.midd + ddd.canv.height/2
            z = projectedVertices[v][2]
            if (z < ddd.clip.min || z > ddd.clip.max){
                return;
            }else{
                if (first) {
                    ddd.ctx.moveTo(x1,y1);
                    first=false;
                }else{
                    ddd.ctx.lineTo(x2,y2);
                }
            }
        }
        ddd.ctx.closePath();
        ddd.ctx.strokeStyle="white";
        ddd.ctx.stroke();
    }
    
    if (mode===ddd.rendermode.triangles) {
        for (var v in projectedVertices) {
            v=parseInt(v);
            if (v%3==0) {
                x1 = projectedVertices[v  ][0] * ddd.canv.midd + ddd.canv.width/2
                y1 = projectedVertices[v  ][1] * ddd.canv.midd + ddd.canv.height/2
                z1 = projectedVertices[v  ][2]
                x2 = projectedVertices[v+1][0] * ddd.canv.midd + ddd.canv.width/2
                y2 = projectedVertices[v+1][1] * ddd.canv.midd + ddd.canv.height/2
                z2 = projectedVertices[v+1][2]
                x3 = projectedVertices[v+2][0] * ddd.canv.midd + ddd.canv.width/2
                y3 = projectedVertices[v+2][1] * ddd.canv.midd + ddd.canv.height/2
                z3 = projectedVertices[v+2][2]
                if (z1 > ddd.clip.min && z1 < ddd.clip.max && z2 > ddd.clip.min && z2 < ddd.clip.max && z3 > ddd.clip.min && z3 < ddd.clip.max){
                    ddd.ctx.beginPath();
                    ddd.ctx.moveTo(x1,y1);
                    ddd.ctx.lineTo(x2,y2);
                    ddd.ctx.lineTo(x3,y3);
                    ddd.ctx.closePath();
                    ddd.ctx.strokeStyle="white";
                    ddd.ctx.stroke();
                }
            }
        }
    }
    
    if (mode===ddd.rendermode.triangles_strip) {
        for (var v in projectedVertices) {
            v=parseInt(v);
            if (v<projectedVertices-2) {
                x1 = projectedVertices[v  ][0] * ddd.canv.midd + ddd.canv.width/2
                y1 = projectedVertices[v  ][1] * ddd.canv.midd + ddd.canv.height/2
                z1 = projectedVertices[v  ][2]
                x2 = projectedVertices[v+1][0] * ddd.canv.midd + ddd.canv.width/2
                y2 = projectedVertices[v+1][1] * ddd.canv.midd + ddd.canv.height/2
                z2 = projectedVertices[v+1][2]
                x3 = projectedVertices[v+2][0] * ddd.canv.midd + ddd.canv.width/2
                y3 = projectedVertices[v+2][1] * ddd.canv.midd + ddd.canv.height/2
                z3 = projectedVertices[v+2][2]
                if (z1 > ddd.clip.min && z1 < ddd.clip.max && z2 > ddd.clip.min && z2 < ddd.clip.max && z3 > ddd.clip.min && z3 < ddd.clip.max){
                    ddd.ctx.beginPath();
                    ddd.ctx.moveTo(x1,y1);
                    ddd.ctx.lineTo(x2,y2);
                    ddd.ctx.lineTo(x3,y3);
                    ddd.ctx.closePath();
                    ddd.ctx.strokeStyle="white";
                    ddd.ctx.stroke();
                }
            }
        }
    }
    
    if (mode===ddd.rendermode.triangles_fan) {
        x = projectedVertices[0][0] * ddd.canv.midd + ddd.canv.width/2;     //first point
        y = projectedVertices[0][1] * ddd.canv.midd + ddd.canv.height/2;
        z = projectedVertices[0][2];
        for (var v in projectedVertices) {
            v=parseInt(v);
            if (v<projectedVertices.length-1) {
                x1 = projectedVertices[v  ][0] * ddd.canv.midd + ddd.canv.width/2
                y1 = projectedVertices[v  ][1] * ddd.canv.midd + ddd.canv.height/2
                z1 = projectedVertices[v  ][2]
                x2 = projectedVertices[v+1][0] * ddd.canv.midd + ddd.canv.width/2
                y2 = projectedVertices[v+1][1] * ddd.canv.midd + ddd.canv.height/2
                z2 = projectedVertices[v+1][2]
                if (z > ddd.clip.min && z < ddd.clip.max && z1 > ddd.clip.min && z1 < ddd.clip.max && z2 > ddd.clip.min && z2 < ddd.clip.max){
                    ddd.ctx.beginPath();
                    ddd.ctx.moveTo(x,y);
                    ddd.ctx.lineTo(x1,y1);
                    ddd.ctx.lineTo(x2,y2);
                    ddd.ctx.closePath();
                    ddd.ctx.strokeStyle="white";
                    ddd.ctx.stroke();
                }
            }
        }
    }
    
    if (mode===ddd.rendermode.faces) {
        for (var f of mesh.faces) {
            var first=true;
            ddd.ctx.beginPath();
            for (var v of f) {
                v = parseInt(v);
                x = projectedVertices[v][0] * ddd.canv.midd + ddd.canv.width/2
                y = projectedVertices[v][1] * ddd.canv.midd + ddd.canv.height/2
                z = projectedVertices[v][2]
                if (z < ddd.clip.min || z > ddd.clip.max){
                    return;
                }else{
                    if (first) {
                        first=false;
                        ddd.ctx.moveTo(x,y);
                    }else{
                        ddd.ctx.lineTo(x,y);
                    }
                }
            }
            ddd.ctx.closePath();
            ddd.ctx.strokeStyle="white";
            ddd.ctx.stroke();
        }
    }
}

function degToRad(a) {
    return a * Math.PI / 180;
}
function radToDeg(a) {
    return a / Math.PI * 180;
}
