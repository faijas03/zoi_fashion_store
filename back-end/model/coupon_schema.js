const { string, number, required, date } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const coupon = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: null,
    },
    discount: {
      type: Number,
      required: true,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const couponschema = mongoose.model("coupon", coupon);
module.exports = couponschema;
