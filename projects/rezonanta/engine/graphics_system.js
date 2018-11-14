export default class GraphicsSystem {
	constructor(canvQuery = "canvas.physicsSim") {
		console.log("Initialising graphics system");
		this.canv = document.querySelector(canvQuery);
		this.ctx = this.canv.getContext("2d");

		this.canv.width = this.canv.height = 1000
		this.canv.style.backgroundColor = "#222";
		this.ctx.strokeStyle = "#fff";
		this.ctx.lineWidth = 3;

		this.ctx.font = "50px Nunito";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "#fff";
	}

	tick(entities) {
		this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);

		for(let entity of entities) {
			/* 1000 px = 1 m */
			const x = entity.x * 1000 + 500, y = 500 - 1000 * entity.y;
			this.ctx.beginPath();
			this.ctx.moveTo(x-5, y-5);
			this.ctx.lineTo(x+5, y+5);
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(x+5, y-5);
			this.ctx.lineTo(x-5, y+5);
			this.ctx.stroke();

			for(let comp of entity.components) {
				const compType = comp.constructor.name;
				switch(compType) {
					case "MaterialPoint":
						let r = Math.sqrt(comp.m);

						this.ctx.beginPath();
						this.ctx.arc(x, y, r * 50, 0, Math.PI*2, false);
						this.ctx.stroke();
						break;
					case "Label":
						this.ctx.fillText(comp.text, x + 20, y);
						break;
					default:
						break;
				}
				if(typeof(comp.draw) == "function") {
					comp.draw(this.ctx);
				}
			}
		}
	}
}
