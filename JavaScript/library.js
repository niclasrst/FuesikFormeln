const math = require('mathjs');

class Formula {
	constructor(name, children = [], equation = '', value = 0) {
		this.name = name;
		this.children = children;
		this.equation = equation;
		this.value = value;
	}

	getChildren = () => {
		return this.children.map((child) => child.name);
	};

	setValue = (val) => {
		this.value = val;
	};

	getFormula = () => {
		return this.equation;
	};

	evalFormula = () => {
		return math.evaluate(this.equation);
	};
}

let m = new Formula('masse', [], '', 1);
let g = new Formula('gewichtskraft', [], '', 9.81);
let s = new Formula('strecke', [], '', 20);
let l = new Formula('länge', [], '', 2);

let F_el = new Formula(
	'elektrische kraft',
	[m, g, s, l],
	`(${m.value} * ${g.value} * ${s.value}) / ${l.value}`
);

console.log(F_el.getChildren());
console.log(F_el.getFormula());
console.log(F_el.evalFormula());
