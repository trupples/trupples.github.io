var ddd = {}
ddd.ctx
ddd.clip = {}
ddd.clip.min = 0.3
ddd.clip.max = 100000000
//http://stackoverflow.com/questions/17885850/how-to-parse-a-string-containing-text-for-a-number-float-in-javascript
function parseSentenceForNumber(sentence){
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
			var vert = parseSentenceForNumber(lines[line]);
			vert[0]=parseInt(vert[0]);vert[0]=vert[0]?vert[0]:0;
			vert[1]=parseInt(vert[1]);vert[1]=vert[1]?vert[1]:0;
			vert[2]=parseInt(vert[2]);vert[2]=vert[2]?vert[2]:0;
			vert[3]=parseInt(vert[3]);vert[3]=vert[3]?vert[3]:0;
			mesh.vertices.push(vert);
		}
		if(/^s*f/.test(lines[line])) {	//face
			var face = parseSentenceForNumber(lines[line]);
			mesh.faces.push(face);
		}
	}
	return mesh
}
