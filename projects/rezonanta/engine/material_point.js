import Component from "./component.js";

export default class MaterialPoint extends Component {
	constructor(mass = 1) {
		super();
		this.system = "physics";
		this.m = mass;
	}

	wasAddedTo(entity) {
		if(this.entity) {
			throw "Can't add the same MaterialPoint to two different entities!";
		}
		this.entity = entity;
		if(this.entity.materialPoint) {
			throw "Can't add two MaterialPoints to the same Entity";
		}
		this.entity.materialPoint = this;
		this.vx = this.vy = 0;
		this.ax = this.ay = 0;
	}

	beforeTick() {}

	tick() {}

	addForce(fx, fy) {
		this.ax += fx / this.m;
		this.ay += fy / this.m;
	}

	afterTick(dt) {
		// calculate the velocity at the middle in between the last and this time point
		// assuming constant acceleration :sob:
		const vx_avg = this.vx + this.ax * dt,
			vy_avg = this.vy + this.ay * dt;

		// update position
		this.entity.x += vx_avg * dt;
		this.entity.y += vy_avg * dt;

		// update velocity (to the one at this time point, not the middle)
		this.vx += this.ax * dt;
		this.vy += this.ay * dt;

		// reset acceleration
		this.ax = this.ay = 0;
	}
}
