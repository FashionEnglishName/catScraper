let nonstandardNumber = 4;
let standardNumber = 4;

function setNumber(type, value) {
	if (type === "nonstandard") {
		nonstandardNumber = value;
	} else {
		standardNumber = value;
	}
}

function getStandard() {
	return standardNumber;
}

function getNonstandard() {
	return nonstandardNumber;
}

exports.setNumber = setNumber;
exports.getNonstandard = getNonstandard;
exports.getStandard = getStandard;