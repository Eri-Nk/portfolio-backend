const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientContact = new Schema(
  {
    name: {
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

const Client = mongoose.model("Client", clientContact);
module.exports = Client;
