const math = require('mathjs');

let treePath = [];

class Quantity {
	constructor(name, value, formula, parents) {
		this.name = name;
		this.value = value;
		this.formula = formula;
		this.parents = parents;
	}
}

let W_el, F_el, E_el, l, q, mgs, m, g, s;

m = new Quantity('Masse', null, [[]], [['mul', mgs]]);

g = new Quantity('Fallbeschleunigung', null, [[]], [['mul', mgs]]);

s = new Quantity('Strecke', null, [[]], [['mul', mgs]]);
l = new Quantity('Länge', null, [[]], [[F_el]]);

mgs = new Quantity('m * g * s', null, [['mul', m, g, s]], [['div1', F_el]]);

E_el = new Quantity('Elektrische Feldstärke', null, [[]], [['mul', F_el]]);

F_el = new Quantity(
	'elektrishce Feldkraft',
	null,
	[
		['div', mgs, l],
		['mul', E_el, q]
	],
	[['mul', W_el]]
);

W_el = new Quantity('elektrische Energie', null, [['mul', F_el, s]], [[]]);

function assignValues(given) {
	//given.map(e, idx => { e[0].value = e[1]; });
	for (var i in given) given[i][0].value = given[i][1];
}

function addToTreePath(node) {
	treePath.push(node);
}

function calculate(searched) {
	let prod = 1;
	let sum = 0;
	let quot;

	if (searched.formula !== [[]]) {
		for (var i in searched.formula) {
			if (searched.formula[i][0] === 'mul') {
				for (j = 1; j < searched.formula[i].length; j++) {
					if (searched.formula[i][j].value !== null) {
						prod *= searched.formula[i][j].value;
					} else {
						break;
					}
				}

				return prod;
			}

			if (searched.formula[i][0] === 'add') {
				for (j = 1; j < searched.formula[i].length; j++) {
					if (searched.formula[i][j].value != null) {
						sum += searched.formula[i][j].value;
					} else {
						break;
					}
				}

				return sum;
			}

			if (searched.formula[i][0] == 'div') {
				if (searched.formula[i][1] != null && searched.formula[i][2] != null) {
					quot = searched.formula[i][1].value / searched.formula[i][2].value;
				} else {
					break;
				}

				return quot;
			}
		}
	} else {
		return false;
	}
}

function goTreeUp(searched) {
	if (searched.parents != [[]]) {
		for (var i in searched.parents) {
			if (searched.parents[i][1].value != null) {
				treePath.push(searched.parents[i]);

				if (searched.parents[i][0] == 'mul') {
				}
			} else {
				goTreeUp();
			}
		}
	} else {
		return false;
	}
}

function getSolution(given, searched) {
	assignValues(given);
	addToTreePath(searched);

	let calc = calculate(searched);
	if (calc == false) {
		goTreeUp(searched);
	} else {
		return calc;
	}
}

getSolution(
	[
		[s, 2],
		[g, 3],
		[F_el, 4],
		[l, 5]
	],
	m
);
