import express from "express";
import session from "express-session";

import path from "path";

import dotenv from "dotenv";

import expressValidator from "express-validator";

import compression from "compression";
import bodyParser from "body-parser";

import mongo from "connect-mongo";
import mongoose from "mongoose";

import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const MongoStore = mongo(session);

dotenv.config({ path: ".env" });

// CONTROLLERS ROUTE HANDLERs
import * as smtpController from "./controllers/smtp";

const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

app.set("port", process.env.PORT || 8090);

// MIDDLEWARES
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  }));
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

app.post("/smtp/verify", smtpController.verify);

app.post("/smtp/send", smtpController.send);

app.post("/smtp/sendAndCopyToSentFolder", smtpController.sendAndCopyToSentFolder);

export default app;