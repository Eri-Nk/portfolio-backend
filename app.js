require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Contact = require("./models/contact");
const mail = require("./utils/mailer");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(PORT, () => {
      logger.info(`Running sucessfully on port ${PORT}`);
    });
  })
  .catch((err) => logger.error("Error is", err));

app.get("/", (req, res) => {
  res.redirect("/contact");
});

app.get("/contact", (req, res) => {
  Contact.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      logger.error(err);
    });
});

app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const result = await contact.save();
    try {
      await mail({
        personName: result.personName,
        email: result.email,
        message: result.message,
      });
    } catch (mailError) {
      logger.error(`Failed to send mail: ${mailError.message}`);
      res.status(202).json({ result, warning: "Mail not sent" });
    }

    res.status(200).json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Failed to save contact" });
  }
});
