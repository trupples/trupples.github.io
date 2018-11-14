import MaterialPoint from "./material_point.js";

export default class PhysicsSystem {
	constructor(fixedTimestep = 1/60) {
		console.log("Initialising physics system with a fixed timestep of", fixedTimestep);
		this.timeStep = fixedTimestep;
		this.timeLast = null;
		this.timeDebt = 0;
	}

	tick(entities) {
		if(this.timeLast == null) this.timeLast = Date.now() / 1000;
		const now = Date.now() / 1000,
			dt = now - this.timeLast;
		this.timeDebt += dt;
		this.timeLast = now;

		while(this.timeDebt > this.timeStep) {
			this.timeDebt -= this.timeStep;

			for(let entity of entities) {
				if(entity.materialPoint) {
					entity.materialPoint.beforeTick();	// reset acceleration, etc.

					for(let component of entity.components) {
						if(component.system == "physics" && typeof component.tick == "function") {
							component.tick(this.timeStep);
						}
					}
				}
			}

			for(let entity of entities) {
				if(entity.materialPoint) {
					entity.materialPoint.afterTick(this.timeStep);		// integrate, etc.
				}
			}
		}
	}
}
