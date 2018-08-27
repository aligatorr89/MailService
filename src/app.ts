import express from "express";
import compression from "compression";
import bodyParser from "body-parser";

import path from "path";

import dotenv from "dotenv";

import expressValidator from "express-validator";

import * as smtpController from "./controllers/smtp";

dotenv.config({ path: ".env" });

const app = express();

app.set("port", process.env.PORT || 8090);

// MIDDLEWARES
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// auth
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  /*if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path == "/account") {
    req.session.returnTo = req.path;
  }*/
  next();
});
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

console.log("env", process.env);

app.post("/smtp/verify", smtpController.verify);

app.post("/smtp/send", smtpController.send);

app.post("/smtp/sendAndCopyToSentFolder", smtpController.sendAndCopyToSentFolder);

export default app;