const bcrypt = require("bcrypt");
const registerschema = require("../model/register_schema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const otpstore = {};

function generateotp() {
  return crypto.randomInt(100000, 999999).toString();
}

exports.forgetpasswordverify = async (req, res) => {
  const { email } = req.body;
  try {
    const userfound = await registerschema.findOne({ email });
    if (!userfound)
      return res.status(400).json({ message: "Unable to find user" });

    const otp = generateotp();
    const expiresat = Date.now() + 10 * 60 * 1000;
    otpstore[email] = { otp, expiresat };
    console.log(otpstore);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "blackmailde@gmail.com",
        pass: "pptw zkal eilj oiar",
      },
    });

    const mailOptions = {
      from: "blackmailde@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "otp send to your email ", email: email });
  } catch (error) {
    console.error("Error in sendotp:", error);
    res.status(500).json({ message: "Error sending OTP", email: email });
  }
};

exports.forgetpasswordupdated = async (req, res) => {
  const { otp, password, confirmpassword, email } = req.body;

  try {
    console.log(otpstore[email]);
    const otpentry = otpstore[email];

    console.log(otpstore[email]);

    if (!otpentry)
      return res.status(400).json({ error: "invalid ot or email" });
    const { otp: sendotp, expiresAt } = otpentry;

    if (Date.now() > expiresAt) {
      delete otpstore[email];
      return res.status(400).json({ error: "OTP expired" });
    }

    if (sendotp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const passwordhashed = await bcrypt.hash(password, 10);
    await registerschema.updateOne({ email }, { password: passwordhashed });

    delete otpstore[email];

    res.status(200).json({ message: "new password set succesfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "unable to update password" });
  }
};
