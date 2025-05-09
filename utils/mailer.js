const nodemailer = require("nodemailer");
const logger = require("./logger");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mail = async function mail({ personName: contactName, email, message }) {
  try {
    const mailOptions = {
      from: `"Eriko Contact Form: " <${contactName}>`,
      to: process.env.EMAIL_USER,
      subject: "New Message from Contact Form",
      text: `${contactName} (${email}) says: ${message}`,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Message sent: ${info.messageId}`);
  } catch (error) {
    logger.error(`Error sending mail: ${error.message}`, error);

    throw error; // so it can be caught in main POST route
  }
};
module.exports = mail;
