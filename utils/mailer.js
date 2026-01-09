const nodemailer = require("nodemailer");
const logger = require("./logger");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const mail = async function mail({ personName: contactName, email, message }) {
  try {
    const mailOptions = {
      from: `"Eriko Contact Form: " <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `"${contactName}" <${email}>`,
      subject: "New Message from Contact Form",
      text: `Name: ${contactName}\nEmail: (${email}) \nMessage: ${message}`,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Message sent: ${info.messageId}`);
  } catch (error) {
    logger.error(`Error sending mail: ${error.message}`, error);
  }
};
module.exports = mail;
