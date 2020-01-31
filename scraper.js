const request = require("superagent");
const cheerio = require("cheerio");

const db = require("./database.js");

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
			console.log(`They have ${curNum} standard cats now`);
			const prevNum = db.getStandard();
			if(curNum > prevNum) {
				console.log("new standard cat!!!");
				db.setNumber("standard", curNum);
				if(prevNum !== -1) {
					// sendEmail
				}
			}
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
			console.log(`They have ${curNum} non standard cats now`);
			const prevNum = db.getNonstandard();
			if(curNum > prevNum) {
				console.log("new nonstand cat!!!");
				db.setNumber("nonstandard", curNum);
				if(prevNum !== -1) {
					// sendEmail
				} 
			}
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

function repeatGetNumber() {
	getNonStandardCatsNumber();
	getStandardCatsNumber();
}


