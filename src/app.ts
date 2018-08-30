import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config({ path: ".env" });

// CONTROLLERS ROUTE HANDLERs
import * as smtpController from "./controllers/smtp";
import * as imapController from "./controllers/imap";

const app = express();

app.set("port", process.env.PORT || 8090);

// MIDDLEWARES
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({limit: "100mb"}));

// auth
app.use((req, res, next) => {
    next();
});

app.post("/smtp/verify", smtpController.verify);

app.post("/smtp/send", smtpController.send);

app.post("/smtp/sendAndCopyToSentFolder", smtpController.sendAndCopyToSentFolder);

app.post("/imap/verify", imapController.verify);

export default app;
