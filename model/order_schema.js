const { ref, string, required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const userorder = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredusers",
      required: true,
    },
    userAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "useraddresses",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        productName: String,
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalBill: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      default: "order status pending",
    },
  },
  { timestamps: true },
);

const user_order = mongoose.model("order", userorder);

module.exports = user_order;
