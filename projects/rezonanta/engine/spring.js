import Component from "./component.js";

export default class Spring extends Component {
	constructor(otherEnd, k=1, l=0.5) {
		super();
		this.otherEntity = otherEnd;
		this.otherMaterialPoint = otherEnd.materialPoint;
		this.k = k;
		this.l = l;
		this.system = "physics";
	}

	wasAddedTo(entity) {
		this.entity = entity;
		this.materialPoint = entity.materialPoint;
	}

	tick() {
		const dx = this.entity.x - this.otherEntity.x,
			dy = this.entity.y - this.otherEntity.y,
			l = Math.hypot(dx, dy),
			dl = l - this.l,
			dx1 = dx / l,
			dy1 = dy / l,
			fx = -dx1 * this.k * dl,
			fy = -dy1 * this.k * dl;

		if(this.materialPoint) this.materialPoint.addForce(fx, fy);
		if(this.otherMaterialPoint) this.otherMaterialPoint.addForce(-fx, -fy);
	}

	draw(ctx) {
		const x = this.entity.x * 1000 + 500, y = -this.entity.y * 1000 + 500;
		ctx.globalAlpha = 0.3;
		const x2 = this.otherEntity.x * 1000 + 500, y2 = 500 - 1000 * this.otherEntity.y,
			l = Math.hypot(x-x2,y-y2), ix = (x2-x)/l, iy=(y2-y)/l, jx = -iy, jy = ix;
		ctx.beginPath();
		// start at this point
		ctx.moveTo(x,y);
		// advance 1/5 of the way
		ctx.lineTo(x+ix*l/5, y+iy*l/5);
		// do a squiggle for the next 3/5
		for(let i=1; i<6; i++) {
			let icomp1 = l/5 + (i-0.25)/6*3*l/5,
				icomp2 = l/5 + (i+0.25)/6*3*l/5,
				jcomp = 10;
			ctx.lineTo(x+ix*icomp1+jcomp*jx, y+iy*icomp1+jcomp*jy);
			ctx.lineTo(x+ix*icomp2-jcomp*jx, y+iy*icomp2-jcomp*jy);
		}
		// do the last 1/5
		ctx.lineTo(x2-ix*l/5, y2-iy*l/5)

		ctx.lineTo(x2,y2);

		ctx.stroke();
		ctx.globalAlpha = 1;
	}
}
