import Component from "./component.js";
import MaterialPoint from "./material_point.js";

export default class Gravity extends Component {
	constructor(g = 9.81) {
		super();
		this.system = "physics";
		this.g = g;
	}

	wasAddedTo(entity) {
		if(this.materialPoint) {
			throw "Can't add the same Gravity component twice";
		}
		this.materialPoint = entity.materialPoint;
	}

	tick(dt) {
		this.materialPoint.addForce(0,
			-this.materialPoint.m * this.g
		);
	}
}
