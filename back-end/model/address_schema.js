const { ref, string, required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const useraddress = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredusers",
      required: true,
    },

    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    postal: {
      type: String,
      required: false,
    },
  },
  { versionKey: false },
);

const address_schema = mongoose.model("Useraddress", useraddress);

module.exports = address_schema;
