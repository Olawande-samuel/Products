const nodemailer = require("nodemailer");

const setupMailer = async () => {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});
	return transporter;
};

async function sendmail({ from, to, subject, text }) {
	const transport = await setupMailer();
	const info = await transport.sendMail({
		from,
		to,
		subject,
		text,
	});
	console.log(info);
	console.log("email sent", nodemailer.getTestMessageUrl(info));
	return info;
}
module.exports = sendmail;
