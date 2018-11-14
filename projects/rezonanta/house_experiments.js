
class HouseExperiment extends Experiment {
	constructor(period, visible=false) {
		super();
		this.period = period;
		this.done = false;
		this.minX = 1; this.maxX = -1;
		const house = [];
		this.house = house;

		const k = 60;

		for(let i=0; i<3; i++) {
			let left = new Entity(-0.1, i*0.2 - 0.4);
			let right = new Entity(0.1, i*0.2 - 0.4);

			if(i>0) {
				left.has(new MaterialPoint(1));
				left.has(new Gravity(0.1));
				left.has(new Friction(1));
				left.has(new Spring(house[2*i-2], k, 0.2));
				left.has(new Spring(house[2*i-1], k, 0.282));
				left.has(new Spring(right, k, 0.2));

				right.has(new MaterialPoint(1));
				right.has(new Gravity(0.1));
				right.has(new Friction(1));
				right.has(new Spring(house[2*i-2], k, 0.282));
				right.has(new Spring(house[2*i-1], k, 0.2));
			}

			house.push(left, right);
		}

		const peak = new Entity(0, 0.2);
		peak.has(new MaterialPoint(0.1));
		peak.has(new Gravity(0.01));
		peak.has(new Friction(1));
		peak.has(new Spring(house[4], 20, 0.2));
		peak.has(new Spring(house[5], 20, 0.2));
		this.peak = peak;

		house.push(peak);

		this.sim = new Simulation(house);
		if(!visible) {
				this.sim.graphics = {tick: ()=>{}}
				this.stop = _=>_;
		}
	}

	run() {
		super.run();
		this.interval2 = setInterval(this.movePlatform.bind(this), 10);

		setTimeout(() => {
			this.interval1 = setInterval(this.updateX.bind(this), 10);
		}, 3000);	// wait for the stuff to stabilise
	}

	stop() {
		super.stop();
		this.done = true;
		clearInterval(this.interval1);
		clearInterval(this.interval2);
	}

	updateX() {
		this.x = this.peak.materialPoint.vx;
		if(this.x < this.minX) this.minX = this.x;
		if(this.x > this.maxX) this.maxX = this.x;
	}

	movePlatform() {
		if(!this.startT) this.startT = Date.now() / 1000;
		const t = (Date.now() / 1000 - this.startT) * Math.PI*2 / this.period;
		this.house[0].x = -0.1 + Math.sin(t) * 0.04;
		this.house[1].x = 0.1 + Math.sin(t) * 0.04;
	}
}

class HouseBatchExperiment extends Experiment {
	constructor(low, high, divisions=100) {
		super();
		this.g = new Simulation([]).graphics;

		const experiments = [];
		for(let i=low; i<high; i+=(high-low)/divisions)
			experiments.push(new HouseExperiment(i))
		this.experiments = experiments;

		this.compare = false;

		this.realLife = new Image();
		this.realLife.src = "real_life_response.png";
		this.realLife.width = 1000;
	}

	run() {
		super.run();
		this.presentData();
		for(let exp of this.experiments) {
			exp.run();
		}
	}

	stop() {
		super.stop();
		for(let exp of this.experiments) {
			exp.stop();
		}
	}

	presentData() {
		const g = this.g, experiments = this.experiments;
		g.ctx.clearRect(0,0,1000,1000);
		g.ctx.save();
		g.ctx.textAlign = "center";
		g.ctx.font = "50px Nunito";

		if(this.compare) {
			g.ctx.translate(0,-350);

			if(this.realLife.complete)
				g.ctx.drawImage(this.realLife, 0, 800, 1000, 500);
		}

		if(!this.compare) {
			g.ctx.fillText("Reacția casei la oscilații cu", 500, 200);
			g.ctx.fillText("perioada între "+experiments[0].period.toFixed(3)+" și "+experiments[experiments.length-1].period.toFixed(3), 500, 260);
		}

		if(experiments[0].maxX < experiments[0].minX) {
			/* i.e. nu a inceput simulatia inca */
			g.ctx.fillText("Stabilizare...", 500, 500);
		} else {
			g.ctx.font = "20px Nunito";
			for(let i=0; i<experiments.length; i++) {
				let x = 800 * i / experiments.length + 100;
				g.ctx.fillRect(x-3, 700, 6, (experiments[i].maxX-experiments[i].minX) * -200);

				if(i % 10 == 0) {
					g.ctx.fillText(experiments[i].period.toFixed(3), x, 720);
				}
			}

			g.ctx.fillText(experiments[experiments.length-1].period.toFixed(3), 900, 720);
		}

		if(experiments[0].done && !this.compare) {
			g.ctx.font = "50px Nunito";
			g.ctx.fillText("[experiment oprit după 30s]", 500, 800);
		}

		g.ctx.restore();

		if(this.running)
			requestAnimationFrame(this.presentData.bind(this));
	}
}

function do_house_experiment() {
	switchToExperiment(new HouseExperiment(getMyNum("house_sim_period"), true));
}

function do_batch_experiment() {
	switchToExperiment(window.house_batch = new HouseBatchExperiment(
		getMyNum("house_batch_period1"), getMyNum("house_batch_period2"))
	);
}

const static_house = new HouseExperiment(2, true);
