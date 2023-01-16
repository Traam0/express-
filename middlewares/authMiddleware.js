/** @format */

const jswt = require("jsonwebtoken");
const { Request, Response, json } = require("express");

const validateAuthToken = (req, res, next) => {
  const token = req.headers.xtoken;

  if (token) {
    jswt.verify(token, process.env.jswtKey, (err, user) => {
      if (err) {
        return res.status(401).json({ messgae: "invalid authToken" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(403).json({ message: "not authenticated" });
  }
};

const authenticateAuthToken = (req, res, next) => {
  validateAuthToken(req, res, () => {
    if (
      req.user._id === req.params.id ||
      [process.env.tchrCode, process.env.ownerCode].includes(req.user.role)
    ) {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  });
};

const adminOnly = (req, res, next) => {
  validateAuthToken(req, res, () => {
    if ([process.env.tchrCode, process.env.ownerCode].includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  });
};

const ownerOnly = (req, res, next) => {
  validateAuthToken(req, res, () => {
    if (process.env.ownerCode === req.user.role) {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  });
};

module.exports = { ownerOnly, adminOnly, authenticateAuthToken, validateAuthToken };
