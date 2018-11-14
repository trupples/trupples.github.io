"use strict";

class IntroSpringExperiment extends Experiment {
	constructor() {
		super();
		const A = new Entity(0, 0.4);
		const B = new Entity(0, 0);
		B.has(new MaterialPoint(0.2));
		B.has(Gravity);
		B.has(new Spring(A, 10, 0.4));
		this.sim = new Simulation([A, B]);
	}

	run() {
		super.run();
	}

	stop() {
		super.stop();
	}
}

class ThreeSpringsExperiment extends Experiment {
	constructor(p1, p2, p3) {
		super();
		this.p1 = p1; this.p2 = p2; this.p3 = p3;

		this.A1 = new Entity(-.2, 0.4);
		this.B1 = new Entity(-.2, 0);
		this.B1.has(new MaterialPoint(0.1));
		this.B1.has(new Friction(0.1));
		this.B1.has(Gravity);
		this.B1.has(new Spring(this.A1, 10, 0.4));

		this.A2 = new Entity(0, 0.4);
		this.B2 = new Entity(0, 0);
		this.B2.has(new MaterialPoint(0.1));
		this.B2.has(new Friction(0.1));
		this.B2.has(Gravity);
		this.B2.has(new Spring(this.A2, 10, 0.4));

		this.A3 = new Entity(.2, 0.4);
		this.B3 = new Entity(.2, 0);
		this.B3.has(new MaterialPoint(0.1));
		this.B3.has(new Friction(0.1));
		this.B3.has(Gravity);
		this.B3.has(new Spring(this.A3, 10, 0.4));

		this.sim = new Simulation([this.A1, this.B1, this.A2, this.B2, this.A3, this.B3]);
	}

	run() {
		super.run();
		this.interv = setInterval(this.updatePositions.bind(this), 0);
	}

	stop() {
		super.stop();
		clearInterval(this.interv);
	}

	updatePositions() {
		if(!this.firstT) this.firstT = Date.now() / 1000;
		const t = Date.now() / 1000 - this.firstT;
		this.A1.y = 0.3 + 0.05 * Math.sin(t / this.p1 * Math.PI * 2);
		this.A2.y = 0.3 + 0.05 * Math.sin(t / this.p2 * Math.PI * 2);
		this.A3.y = 0.3 + 0.05 * Math.sin(t / this.p3 * Math.PI * 2);
	}
}

const single_spring = new IntroSpringExperiment();

function do_threesprings_experiment() {
	switchToExperiment(new ThreeSpringsExperiment(
		getMyNum("three_springs_1"),
		getMyNum("three_springs_2"),
		getMyNum("three_springs_3")));
}
