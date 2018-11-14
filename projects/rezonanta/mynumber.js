"use strict";

const myNumbers = document.querySelectorAll(".myNumber");

for(let num of myNumbers) {
	const minus = num.querySelector(".myNumber > div:nth-of-type(1)"),
		content = num.querySelector(".myNumber > div:nth-of-type(2)"),
		plus = num.querySelector(".myNumber > div:nth-of-type(3)");

	num.dataset.step = num.dataset.step || 0.2;
	num.dataset.precision = num.dataset.precision || 1;

	minus.onclick = () => {
		content.innerText = (parseFloat(content.innerText) - parseFloat(num.dataset.step)).toFixed(parseFloat(num.dataset.precision));
	}
	plus.onclick = () => {
		content.innerText = (parseFloat(content.innerText) + parseFloat(num.dataset.step)).toFixed(parseFloat(num.dataset.precision));
	}
}

function getMyNum(id) {
	return parseFloat(document.querySelector('#' + id + ' > div:nth-of-type(2)').innerText);
}

window.getMyNum = getMyNum;
