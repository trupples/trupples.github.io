
const FFTLen = 64;
class FilterExperiment extends Experiment {
	constructor() {
		super();
		this.A = new Entity(-.25, -0.2);
		this.A.has(new MaterialPoint(Infinity));
		this.caA = new ComplexArray(FFTLen);

		this.B = new Entity(.25, -0.2);
		this.B.has(new MaterialPoint(0.1));
		this.B.has(this.fr = new Friction(0.01));
		this.B.has(new Spring(this.A, 10, 0.5));
		this.caB = new ComplexArray(FFTLen);

		this.Asamples = [];
		this.Bsamples = [];

		this.monitor = {
			materialPoint: {beforeTick: _=>_, afterTick: _=>_, tick: _=>_},
			components: new Set([
				{
					system: "physics",
					tick: this.collectSamples.bind(this)
				},
				{
					system: "graphics",
					draw: this.drawFFT.bind(this)
				}
			])
		};

		this.sim = new Simulation([this.A, this.B, this.monitor]);
	}

	run() {
		super.run();
		this.interv = setInterval(this.moveA.bind(this), 0);
	}

	stop() {
		super.stop();
		clearInterval(this.interv);
	}

	moveA() {
		this.A.lastX = this.A.x;
		
		this.A.x = Math.sin(Math.exp(3+3*Math.sin(Date.now()/1000 / 10))) * 0.05 - 0.25;
		this.A.x = (Math.random() - 0.5) * 0.05 - 0.25;

		this.A.vx = (this.A.x - this.A.lastX) / (Date.now()/1000 - this.A.lastT);
		this.A.lastT = Date.now()/1000;
	}

	collectSamples() {
		update_filter1_mass();

		this.Asamples.push(this.A.vx);
		this.Bsamples.push(this.B.materialPoint.vx);

		if(this.Asamples.length > FFTLen) this.Asamples.shift();
		if(this.Bsamples.length > FFTLen) this.Bsamples.shift();
	}

	drawFFT(ctx) {
		// wait for the buffer to fill up
		if(this.Asamples.length < FFTLen) return;

		if(window.debugFFT) debugger;

		if(isNaN(this.caA.real[0]))
			this.caA = new ComplexArray(FFTLen);
		if(isNaN(this.caB.real[0]))
			this.caB = new ComplexArray(FFTLen);

		this.caA.map((val, i, n) => {
			val.real = this.Asamples[i];
		});
		this.caB.map((val, i, n) => {
			val.real = this.Bsamples[i];
		});

		this.caA.FFT(); this.caB.FFT();

		this.caB.forEach((val, i) => {
			if(i > FFTLen/2) return;
			const len = Math.hypot(val.real, val.imag) * 30;
			ctx.fillRect(550 + 2*i * 400 / FFTLen - 3, 600 - len, 6, len);
		});

		this.caA.forEach((val, i) => {
			if(i > FFTLen/2) return;
			const len = Math.hypot(val.real, val.imag) * 30;
			ctx.fillRect(50 + 2*i * 400 / FFTLen - 3, 600 - len, 6, len);
		});
	}

	tuneMass(m) {
		const mass_ratio = m / this.B.materialPoint.m;
		this.B.materialPoint.m *= mass_ratio;
		//this.fr.coefficient *= mass_ratio;
		//this.B.materialPoint.vx /= mass_ratio*mass_ratio;	// gotta conserve that energy
		//this.B.materialPoint.vy /= mass_ratio*mass_ratio;
	}
}

function update_filter1_mass() {
	filter_scene.tuneMass(parseFloat(document.querySelector('#filter1_mass > div:nth-of-type(2)').innerText));
}

const filter_scene = new FilterExperiment();
