const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT;


mongoose.connect(process.env.CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.on("open", () => console.log("mongoose is connected"));
mongoose.connection.on("error", (err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(PORT);

console.log("mongoose is running on port: "+ PORT)
