import { createTransport, TransportOptions, Transport, Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import MailComposer from "nodemailer/lib/mail-composer";
import { IResponseSuccess, ResponseSuccess } from "../util/response_success";
import { IResponseError, ResponseError } from "../util/response_error";
import { IMAP } from "./imap";

import { default as User, UserModel } from "../models/User";

interface ISMTP {
    transporter: Transporter;
    verify(): Promise<IResponseSuccess | IResponseError>;
    send(mail: SendMailOptions): Promise<IResponseSuccess | IResponseError>;
    copyToSentFolder(mail: SendMailOptions, Imap: IMAP): Promise<IResponseSuccess | IResponseError>;
}

export class SMTP {
    public transporter: Transporter;

    constructor(config: Transport) {
        this.transporter = createTransport(config);
    }

    /*public firstVerify(): Promise<IResponseSuccess | IResponseError> {
        return this.transporter.verify()
        .then(() => {

        })
    } */

    public verify(): Promise<IResponseSuccess | IResponseError> {
        return this.transporter.verify()
        .then(() => ResponseSuccess)
        .catch(error => ResponseError(error));
    }

    public verify2(): Promise<boolean | Error> {
        return this.transporter.verify()
        .then(re => re)
        .catch(error => error);
    }

    public send(mail: SendMailOptions): Promise<IResponseSuccess | IResponseError> {
        return this.transporter.verify()
        .then(() => this.transporter.sendMail(mail))
        .then(() => ResponseSuccess)
        .catch(error => ResponseError(error));
    }

    public copyToSentFolder(mail: SendMailOptions, Imap: IMAP): Promise<IResponseSuccess | IResponseError> {
        return new Promise((resolve, reject) => {
            new MailComposer(mail).compile().build((error, result) => {
                if (error) {
                    reject(error);
                } else {
                    Imap.copyToSentFolder(result)
                    .then(re => resolve(re));
                }
            });
        });
    }
}
