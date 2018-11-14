import assert from "./assert.js";

export default class Entity {
	constructor(x=0, y=0, components=[]) {
		assert(typeof(x) == "number");
		assert(typeof(y) == "number");

		components = new Set([components].flat());
	
		this.x = x; this.y = y; this.components = components;
	}

	getFirstOfType(componentClass) {
		for(let comp of this.components)
			if(componentClass.isPrototypeOf(comp))
				return comp;
	}

	has(component) {
		if(typeof(component) == "function")	/* i.e. it's a class constructor, not an instance */
			return this.has(new component());

		if(this.components.has(component))		/* we already have this exact instance. Not sure if this will ever be useful */
			return;

		this.components.add(component);	/* Add it to the set */
		component.wasAddedTo(this);		/* Notify the component that it was added */
	}
};
