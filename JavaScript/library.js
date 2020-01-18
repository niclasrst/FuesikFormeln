const math = require('mathjs');

let treePath = [];

class Quantity {
	constructor (name, unit, value, formula, parents) {
		this.name = name;
		this.unit = unit;
		this.value = value;
		this.formula = formula;
		this.parents = parents;
	};
}

let W_el, F_el, E_el, l, q, mgs, m, g, s;

m = new Quantity(
	"Masse",
	"kg",
	null,
	[[]],
	[["mul", mgs]]
);

g = new Quantity(
	"Fallbeschleunigung",
	"m/s²",
	null,
	[[]],
	[["mul", mgs]]
);
	
s = new Quantity(
	"Strecke",
	"m",
	null,
	[[]],
	[["mul", mgs]]
);
l = new Quantity(
	"Länge", 
	"m",
	null,
	[[]],
	[["div2", F_el]]
);
	
mgs = new Quantity(
	"m * g * s",
	null,
	null,
	[["mul", m, g, s]],
	[["div1", F_el]]
);

E_el = new Quantity(
	"Elektrische Feldstärke",
	"N/C oder V/m",
	null,
	[[]],
	[["mul", F_el]]
);

F_el = new Quantity(
	"elektrishce Feldkraft",
	"N",
	null,
	[["div", mgs, l], ["mul", E_el, q]],
	[["mul", W_el]]
);

W_el = new Quantity(
	"elektrische Energie",// ok wahrscheinlich besser so
	"J", // mach Schluss für heute // bin iwi überfordet xD // calcByPath ist reines Umformen so nervig
	null,
	[["mul", F_el, s]],
	[[]]
);


function assignValues(given) {
	//given.map(e, idx => { e[0].value = e[1]; });
	for (var i in given) {
		given[i][0].value = given[i][1];
	}
}

function addToTreePath(node) { 

	treePath.push(node);
}

function calcByPath() {

	let calc;

	for (i = treePath.length - 1; i > 0; i--) {

		if (treePath[i][0] == "mul") {

			
		}

		if (treePath[i][0] == "add") {

			
		}

		if (treePath[i][0] == "div1") {


		}

		if (treePath[i][0] == "div2") {

			
		}
	}

	// für die die Formelnumformen lieben
}

function onlyOneUnknown(formula, quantity) { // quantity -> 
	return formula.filter((e) => e[1] == quantity).length !== 0;
}

function calculate(searched) {
	
	let prod = 1;
	let sum = 0;
	let quot;

	if (searched.formula !== [[]]) {
		
		for (var i in searched.formula) {

			if (searched.formula[i][0] === "mul") {
			
				for (j = 1; j < searched.formula[i].length; j++) {

					if (searched.formula[i][j].value !== null) {

						prod *= searched.formula[i][j].value;

					} else { break; }
				}

				return prod;
			}

			if (searched.formula[i][0] === "add") {

				for (j = 1; j < searched.formula[i].length; j++) {

					if (searched.formula[i][j].value != null) {

						sum += searched.formula[i][j].value;

					} else { break; }
				}

				return sum;
			}

			if (searched.formula[i][0] == "div") {

				if (searched.formula[i][1] != null && searched.formula[i][2] != null) {

					quot = searched.formula[i][1].value / searched.formula[i][2].value;

				} else { break; }

				return quot;
			}
		}

	} else {

		return false;
	}
}

function goTreeUp(searched) {

	if (searched.parents != [[]]) { // hat die Größe Parents? falls nein -> unberechenbar

		for (var i in searched.parents) { // durch die Parents iterieren
			
			if (searched.parents[i][1].value != null) { // wenn der Parent einen Wert besitzt
				
				for (var j in searched.parents[i][1].formula) { // durch die Formeln im Parent iterieren

					if (searched.parents[i][1].formula[j].includes(searched)) { // wenn die Formel die Größe aus der vorherigen Schicht enthält
						
						if (onlyOneUnknown(searched.parents[i].formula[j], searched)) { // wenn die Formel nur diese Größe nicht enthält
																			
							treePath.push(searched.parents[i]); // in treePath notieren
							
							return true;
						}
					}
				}
			}
		}
	}

	return false;
}

function getSolution(given, searched) {

	assignValues(given);
	addToTreePath(searched);

	let calc = calculate(searched);

	if (calc != false) {

		return calc;

	} else {

		let test = goTreeUp(searched);

		if (test) { return calcByPath(); } else { return "FAILURE" }
	}
}

console.log(getSolution([[s, 2], [g, 3], [F_el, 4], [l, 5]], m));

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