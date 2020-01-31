const request = require("superagent");
const cheerio = require("cheerio");

const db = require("./database.js");
const send = require("./email.js");

const url = "http://skjolaas.com/";

setInterval(repeatGetNumber, 10000);

/*
 * @param {void}
 * @return {int}  
 *
 */
function getStandardCatsNumber() {
	getCatNumber(url + "availablestandardkittens.html")
		.then(curNum => {
			const prevNum = db.getStandard();
			checkUpdate(curNum, prevNum, "standard")
		});
}

/*
 * @param {void}
 * @return {int}  
 *
 */
function getNonStandardCatsNumber() {
	// A request object
	getCatNumber(url + "nonstandardkittens.html")
		.then(curNum => {
			const prevNum = db.getNonstandard();
			checkUpdate(curNum, prevNum, "nonstandard")
		});
}

/*
 * @param {string}
 * @return {Promise}  
 *
 */
function getCatNumber(url) {
	const result = request
		.get(url )
		.then(res => {
			const $ = cheerio.load(res.text);
			let count = 0;
			$("b").each(function (index) {
				if($(this).text().indexOf("Click On") >= 0) count++;
			});
			return count;
		});
	return result;
}

function checkUpdate(cur, prev, type) {
	if(cur > prev) {
		db.setNumber(type, cur);
		if(prev !== -1) {
			// sendEmail
			send(type);
		} else if(cur < prev) {
			db.setNumber(type, cur);
		}
	}
}

function repeatGetNumber() {
	getNonStandardCatsNumber();
	getStandardCatsNumber();
}


