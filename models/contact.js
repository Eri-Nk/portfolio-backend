const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientContact = new Schema(
  {
    personName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", clientContact);
module.exports = Contact;
