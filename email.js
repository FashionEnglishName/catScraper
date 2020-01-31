const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.EMAIL_API_KEY);

function sendEmail(type) {
	
	sgMail.send({
		// to: "yuchunhuif@outlook.com",
		to: process.env.TO,
		from: process.env.FROM,
		subject: `新猫猫! ${type}`,
		text: "http://skjolaas.com/",
		html: `http://skjolaas.com/${type === 'standard' ? "availablestandardkittens.html" : "nonstandardkittens.html"}`
	});
}

module.exports = sendEmail;