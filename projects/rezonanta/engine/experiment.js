export default class Experiment {
	constructor() {
		this.sim = {run:_=>_, stop:_=>_};
	}

	run() {
		this.sim.run();
		this.running = true;
	}

	stop() {
		this.sim.stop();
		this.running = false;
	}
}
