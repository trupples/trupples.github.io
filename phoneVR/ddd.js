var ddd = {}
ddd.ctx
ddd.clip = {}
ddd.clip.min = 0.3
ddd.clip.max = 10000

//PROJECTION
ddd.project=function(vertex){
	var _x=-vertex.x/vertex.z;
	var _y= vertex.y/vertex.z;
	var _z=-vertex.z;
	return {x:_x,y:_y,z:_z};
}

//MATRICES
ddd.matrix = {}

ddd.matrix.apply=function(vertex, matrix){
	var x = vertex.x
	var y = vertex.y
	var z = vertex.z
	var w = vertex.w
	vertex.x	= x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2] + w * matrix[0][3]
	vertex.y	= x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2] + w * matrix[1][3]
	vertex.z	= x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2] + w * matrix[2][3]
	vertex.w	= x * matrix[3][0] + y * matrix[3][1] + z * matrix[3][2] + w * matrix[3][3]
	return vertex
}

//TRANSFORMATION MATRICES
ddd.matrix.translation=function(vec){
	var matrix = [
		[ 1 , 0 , 0 , vec.x ],
		[ 0 , 1 , 0 , vec.y ],
		[ 0 , 0 , 1 , vec.z ],
		[ 0 , 0 , 0 , vec.w ],
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
			var vert = /(\+|-)?((\d+(\.\d+)?)|(\.\d+))/g.exec(lines[line]);
			vert.x=parseInt(vert.x);vert.x=vert.x?vert.x:0;
			vert.y=parseInt(vert.y);vert.y=vert.y?vert.y:0;
			vert.z=parseInt(vert.z);vert.z=vert.z?vert.z:0;
			vert.w=parseInt(vert.w);vert.w=vert.w?vert.w:0;
			mesh.vertices.push(vert);
		}
		if(/^s*f/.test(lines[line])) {	//face
			var face = /(\+|-)?((\d+(\.\d+)?)|(\.\d+))/g.exec(lines[line]);
			mesh.faces.push(face);
		}
	}
	return mesh
}

//conversion
ddd.vecToArr=function(vec){
	return [vec.x,vec.y,vec.z,vec.w];
}
ddd.arrToVec=function(arr){
	return {x:arr[0],y:arr[1],z:arr[2],w:arr[3]};
}
