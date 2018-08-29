import nodemailer from "nodemailer";
import { Transporter, SendMailOptions } from "nodemailer";
// { createTransport, TransportOptions, Transport, Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import MailComposer from "nodemailer/lib/mail-composer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IResponseSuccess, ResponseSuccess } from "../util/response_success";
import { IResponseError, ResponseError } from "../util/response_error";
import { IMAP } from "./imap";

// just for model, not implemented
interface ISMTP {
    transporter: Transporter;
    verify(): Promise<Object>;
    send(mail: SendMailOptions): Promise<Object>;
    copyToSentFolder(mail: SendMailOptions, Imap: IMAP): Promise<Object>;
}

export class SMTP {
    public transporter: Transporter;

    constructor(config: SMTPTransport.Options) {
        this.transporter = nodemailer.createTransport(config);
    }

    public verify(): Promise<Object> {
        return this.transporter.verify()
        .then(() => ResponseSuccess)
        .catch(error => ResponseError(error));
    }

    public send(mail: SendMailOptions): Promise<Object> {
        return this.transporter.verify()
        .then(() => this.transporter.sendMail(mail))
        .then(() => ResponseSuccess)
        .catch(error => ResponseError(error));
    }

    public copyToSentFolder(mail: SendMailOptions, Imap: IMAP): Promise<Object> {
        return new Promise((resolve, reject) => {
            new MailComposer(mail).compile().build((error, result) => {
                if (error) {
                    reject(error);
                } else {
                    Imap.copyToSentFolder(result)
                    .then(() => resolve(ResponseSuccess))
                    .catch(error => reject(ResponseError(error)));
                }
            });
        });
    }
}
