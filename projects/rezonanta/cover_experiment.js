"use strict";

class CoverExperiment extends Experiment {
	constructor() {
		super();

		const A = new Entity(0, 0.3);
		this.A = A;
		A.has(new Label("❤️"));

		let last;
		const around = new Array(6).fill().map((_,i) => {
			const B = new Entity(Math.sin(i)*0.4, Math.cos(i)*0.4);
			B.has(new MaterialPoint(0.1));
			B.has(new Friction(1));
			B.has(new Spring(A, 10, 0.2 + i * 0.03));
			B.has(Gravity);
			B.has(new Label(["J", "A", "A", "E", "I", "J"][i]));
			last = B;
			return B;
		});

		for(let i=0; i<6; i++)
			for(let j=i+1; j<6; j++)
				around[i].has(new Spring(around[j], 10, 0.4 + 0.05 * Math.random()));

		this.sim = new Simulation([A, ...around]);;
	}

	run() {
		super.run();
		this.interv = setInterval(() => {
			this.A.x = Math.sin(Date.now()/200) * 0.1;
			this.A.y = Math.sin(Date.now()/100) * 0.05 + 0.3;
		}, 10);
	}

	stop() {
		super.stop();
		clearInterval(this.interv);
	}
}

const cover = new CoverExperiment();
