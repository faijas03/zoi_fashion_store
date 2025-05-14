const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { type } = require("os");

const registeruser = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    confirmpassword: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isactivate: {
      type: Boolean,
      default: "true",
    },
  },
  { versionKey: false },
);

const registerschema = mongoose.model("registeredusers", registeruser);

module.exports = registerschema;
