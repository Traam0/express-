/** @format */

const mongoose = require("mongoose");
const jswt = require("jsonwebtoken");
const crypto = require("crypto-js");
const userModel = require("../models/userModel");

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const depass = crypto.AES.decrypt(req.user.password, process.env.passKey).toString(
        crypto.enc.Utf8
      );

      if (depass === req.body.passowrd) {
        const accessToken = jswt.sign({ _id: user._id, email: user.email }, process.env.jswtKey, {
          expiresIn: "30d",
        });

        const { password, ...rest } = user._doc;
        res.status(200).json({ ...rest, accessToken });
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    } else {
      res.status(404).json({
        data: {
          _id: null,
          fname: null,
          lname: null,
          email: null,
          avatar: null,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = { login };
