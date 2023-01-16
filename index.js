/** @format */

const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.set("strictQuery", true);

try {
  mongoose
    .connect("mongodb://127.0.0.1:27017/ISLA?directConnection=true")
    .then(() => {
      console.log("db linke🔥");
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log("Failed to connect to the MongoDB! 😕");
}

app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 9002, () => {
  console.log("Server is up and runnin🔥", process.env.PORT);
});
