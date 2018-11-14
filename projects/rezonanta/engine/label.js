import Component from "./component.js";

export default class Label extends Component {
	constructor(text) {
		super();
		this.system = "graphics";
		this.text = text;
	}

	wasAddedTo(entity) {
		entity.label = this.text;
	}
}
