const FIXED_DT = 1000/20;

class Experiment {
	constructor() {
		this.canv = document.querySelector("canvas");
		this.ctx = this.canv.getContext("2d");
		this.running = false;
	}

	start() {
		this.lastT = Date.now();
		this.timeDebt = 0;

		this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
		this.running = true;
		this.loop();
	}

	stop() {
		this.running = false;
		cancelAnimationFrame(this.animationFrameRequestId);
	}

	loop() {
		const now = Date.now(), dt = now - this.lastT;

		this.tick(dt);

		this.timeDebt += dt;
		while(this.timeDebt > FIXED_DT) {
			console.log("fixed");
			this.fixedTick(FIXED_DT);
			this.timeDebt -= FIXED_DT;
		}

		if(this.running) this.animationFrameRequestId = requestAnimationFrame(this.loop.bind(this));
	}

	tick(dt) {}
	fixedTick(dt) {}
}

function repeat_duration(duration, f) {
	const t_end = Date.now() + duration;
	while(Date.now() < t_end) f();
}

class LogisticMapExperiment extends Experiment {
	constructor() {
		super();
		this.numSamples = 4000;
	}

	start() {
		this.samples = Array(this.numSamples).fill().map((_,i) =>
			({
				r: 1+i*3/this.numSamples,	// between 1 and 4
				y: Math.random()
			})
		);
		super.start();
	}

	drawRep() {
		for(let x=0; x<this.numSamples; x++) {
			const {r, y} = this.samples[x];
			this.samples[x].y = r * y * (1-y);
			this.ctx.fillRect(x/this.numSamples*this.canv.width, this.canv.height*(1-this.samples[x].y), 1, 1);
		}
	}

	tick() {
		this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
		this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
		this.ctx.fillStyle = "rgba(255, 255, 255, 1)";

		repeat_duration(32, this.drawRep.bind(this));
	}
}

class LogfunExperiment extends Experiment {
	constructor() {
		super();
		this.r = -1;
	}

	start() {
		this.r = -1;
		super.start();
	}

	tick() {
		const newR = +document.querySelector("#logfun_exp1_r").value;

		this.ctx.clearRect(0, 0, 2000, 2000);
		this.r = newR;
		this.ctx.font = "1.4rem Arial";
		this.ctx.fillStyle = "#fff";
		let p = (Math.sin(Date.now()/1000)/3+0.5);
		const N = 30;
		for(let i=1; i<N; i++) {
			const y = this.canv.height / N * i;

			this.ctx.fillText("Anul " + i + ": " + (p*100).toFixed(2) + "%", 800, y);
			this.ctx.fillRect(1300, y, 500 * p, -1000/N);

			p = this.r * p * (1-p);
		}
	}
}

class PendulumExperiments extends Experiment {
	constructor() {
		super();
	}

	start() {
		this.timeDebt = 0;
		this.last = Date.now();

		this.d2theta = 0;
	  	this.d2phi = 0;
	  	this.dtheta = 0;
	  	this.dphi = 0;

	  	this.m1 = this.m2 = 10;
	  	this.l1 = this.l2 = 5;

	  	this.ang1 = 1;
	  	this.ang2 = 1.3;

		super.start();
	}

	fixedTick(dt) {
		// Double pendulum sim
		// Stolen from http://bestofallpossibleurls.com/double-pendulum.js
		const timeStep = 0.001;
		let {m1, m2, l1, l2, dphi, d2phi, dtheta, d2theta} = this;
		let theta = this.ang1, phi = this.ang2;

		const g = 0.98;
	    const a = (2*m1+m2-m2*Math.cos(2*theta-2*phi));
		d2theta = (-g*(2*m1+m2)*Math.sin(theta)-m2*g*Math.sin(theta-2*phi)-2*Math.sin(theta-phi)*m2*(dphi*dphi*l2-dtheta*dtheta*l1*Math.cos(theta-phi)))/(l1*a);
		d2phi = (2*Math.sin(theta-phi)*(dtheta*dtheta*l1*(m1+m2)+g*(m1+m2)*Math.cos(theta)+dphi*dphi*l2*m2*Math.cos(theta-phi)))/(l2*a);
		dtheta += d2theta*timeStep;
		dphi += d2phi*timeStep;
		theta += dtheta*timeStep;
		phi += dphi*timeStep;

		const pi = 3.14159265;
		const tau = 2*pi;

		console.log(theta, phi);
		if(theta > pi) {
			theta -= tau;
		}
		if(phi > pi) {
			phi -= tau;
		}
		if(theta < -pi) {
			theta += tau;
		}
		if(phi < -pi) {
			phi += tau;
		}
		console.log(theta, phi);

		this.dphi = dphi; this.d2phi = d2phi;
		this.dtheta = dtheta; this.d2theta = d2theta;
		this.ang1 = theta; this.ang2 = phi;

	}

	tick() {
		this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
		this.ctx.strokeStyle = "#FFF";
		this.ctx.lineWidth = 5;

		// Draw double pendulum
		const cx = 1000, cy = 400, S=100;
		this.ctx.beginPath();
		this.ctx.moveTo(cx, cy);
		this.ctx.lineTo(cx + Math.cos(this.ang1)*this.l1*S, cy + Math.sin(this.ang1)*this.l1*S);
		this.ctx.lineTo(cx + Math.cos(this.ang1)*this.l1*S +
		                     Math.cos(this.ang2)*this.l2*S,
		                cy + Math.sin(this.ang1)*this.l1*S +
		                     Math.sin(this.ang2)*this.l2*S);
		this.ctx.stroke();
	}
}

class ChaosGameExperiment extends Experiment {

	start() {
		this.numPoints = +document.querySelector("#chaos_game_numPoints").value;
		this.norepeat = +document.querySelector("#chaos_game_norepeat").value;
		this.noleft = +document.querySelector("#chaos_game_noleft").value;
		this.noright = +document.querySelector("#chaos_game_noright").value;

		super.start();
	}

	tick() {

		this.numPoints = +document.querySelector("#chaos_game_numPoints").value;
		this.norepeat = document.querySelector("#chaos_game_norepeat").checked;
		this.noleft = document.querySelector("#chaos_game_noleft").checked;
		this.noright = document.querySelector("#chaos_game_noright").checked;
		this.spinny = document.querySelector("#chaos_game_spinny").checked;


		this.ctx.fillStyle = "rgba(0,0,0,0.1)";
		this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

		let px = 0, py = 0;

		const points = [], colors = [];
		const numPoints = this.numPoints;
		//if(numPoints != 3) debugger;

		const e = document.createElement("div");
		e.style.display = "none";
		document.body.appendChild(e);

		for(let i=0; i<numPoints; i++) {
			const unghi = i/numPoints*3.141592653589*2,
				s = Math.sin(unghi), c = Math.cos(unghi);

			points.push({
				x: 1300 + c * 400,
				y: this.canv.height/2 + s * 400,
			});

			e.style.color = `hsl(${i*360/numPoints}deg, 100%, 50%)`;
			colors.push(e.style.color);	// gonna be converted to rgb automatically
		}

		if(this.spinny)
			points[0] = {
				x: 1300 + Math.cos(Date.now()/5000) * 500,
				y: Math.sin(Date.now()/5000) * 500 + this.canv.height/2
			};

		//this.ctx.fillStyle = "white";
		let last = 0;
		repeat_duration(32, () => {
			let drawPointsByColor = Array(numPoints).fill().map(_ => []);
			for(let _=0; _<100; _++) {
				let i;
				let ok = true;
				do {
					ok = true;
					i = Math.floor(Math.random() * numPoints);
					if(i == last && this.norepeat) ok = false;
					if((i+numPoints+1) % numPoints == last && this.noleft) ok = false;
					if((i+numPoints-1) % numPoints == last && this.noright) ok = false;
				} while(!ok && numPoints != 3);
				last = i;

				const hue = 360 * i / numPoints;


				let colt_random = points[(i + numPoints) % numPoints];

				px = (px + colt_random.x) / 2;
				py = (py + colt_random.y) / 2;

				drawPointsByColor[i].push([px, py]);
			}
			for(let color_i=0; color_i<numPoints; color_i++) {
				this.ctx.fillStyle = colors[color_i];
				const pts = drawPointsByColor[color_i];
				for(let j=0; j<pts.length; j++) {
					this.ctx.fillRect(pts[j][0], pts[j][1], 2, 2);
				}
			}
		});
	}

}


window.logmap = new LogisticMapExperiment();
window.logfun_exp1 = new LogfunExperiment();
window.double_pendulum = new PendulumExperiments();
window.chaos_game = new ChaosGameExperiment();

document.querySelector("#logfun_exp1_r").addEventListener("change", (evt) => {
	const self = evt.target;
	document.querySelector("#logfun_exp1_r_preview").innerHTML = "$$ R = " + self.value + " $$";
	renderMathInElement(document.querySelector("#logfun_exp1_r_preview"));
});
