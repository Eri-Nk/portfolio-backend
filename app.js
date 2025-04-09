require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/contact");
});

app.get("/contact", (req, res) => {
  res.json({ message: "Contact route working!" });
});

app.post("/contact", (req, res) => {
  console.log(req.body);

  res.json({
    message: "Form submitted successfully!",
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Running sucessfully on port ${PORT}`);
});
