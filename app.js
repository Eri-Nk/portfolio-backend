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

app.get("/", (req, res) => {
  res.status(200).send("Backend alive 🌱");
});

app.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    logger.error("fetch contacts error:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();

    mail({
      personName: saved.personName,
      email: saved.email,
      message: saved.message,
    }).catch((err) => logger.error("Mail sending failed:", err.message));

    res.status(201).json(saved);
  } catch (err) {
    logger.error("Save contact error:", err);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

/* ---------------- START SERVER ---------------- */

async function startServer() {
  try {
    // optional but useful: fail fast instead of buffering
    mongoose.set("bufferCommands", false);

    await mongoose.connect(process.env.MONGO_URI);

    logger.info("MongoDB connected");

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error("MongoDB connection error:", err);

    // optional: retry logic (very useful for Render + Atlas)
    setTimeout(startServer, 5000);
  }
}

startServer();

// app.listen(PORT, () => {
//   logger.info(`Server listening on port ${PORT}`);
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => logger.info("MongoDB connected"))
//   .catch((err) => logger.error("MongoDB connection error:", err));
