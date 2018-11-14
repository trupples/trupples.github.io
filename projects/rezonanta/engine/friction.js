import Component from "./component.js";
import MaterialPoint from "./material_point.js";

export default class Friction extends Component {
	constructor(coefficient = 1) {
		super();
		this.system = "physics";
		this.coefficient = coefficient;
	}

	wasAddedTo(entity) {
		if(this.materialPoint) {
			throw "Can't add same Friction component twice";
		}
		this.materialPoint = entity.materialPoint;
	}

	tick(dt) {
		this.materialPoint.addForce(
			-this.materialPoint.vx * this.coefficient,
			-this.materialPoint.vy * this.coefficient
		);
	}
}
