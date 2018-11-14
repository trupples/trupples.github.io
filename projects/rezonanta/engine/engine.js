import PhysicsSystem from "./physics_system.js";
import GraphicsSystem from "./graphics_system.js";

/*
export * from "./entity.js";
export * from "./component.js";
export * from "./material_point.js";
export * from "./gravity.js";
export * from "./friction.js";*/

export default class Simulation {
	constructor(scene = []) {
		this.scene = scene;
		this.running = false;

		this.physics = new PhysicsSystem();
		this.graphics = new GraphicsSystem();
	}

	run() {
		this.running = true;
		this.tick();
	}

	stop() {
		this.running = false;
	}

	tick() {
		this.physics.tick(this.scene);
		this.graphics.tick(this.scene);

		if(this.running)
			requestAnimationFrame(this.tick.bind(this));
	}
};
