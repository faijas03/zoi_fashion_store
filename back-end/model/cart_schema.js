const { ref, string, required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const usercart = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredusers",
      required: true,
    },

    items: [
      {
        itemid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    bill: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const user_cart = mongoose.model("cart", usercart);

module.exports = user_cart;
