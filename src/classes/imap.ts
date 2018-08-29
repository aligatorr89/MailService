import imap, { Config } from "imap";

import { IResponseSuccess, ResponseSuccess } from "../util/response_success";
import { IResponseError, ResponseError } from "../util/response_error";

export class IMAP {
    public connection: imap;
    constructor(config: Config) {
        this.connection = new imap(config);
    }

    public verify() {
        return new Promise((resolve, reject) => {
            this.connection.connect();

            this.connection.once("ready", () => {
                this.connection.end();
                resolve(ResponseSuccess);
            });

            this.connection.once("error", (error: any) => {
                this.connection.end();
                reject(ResponseError(error));
            });
        });
    }

    public copyToSentFolder = (buffer: Buffer): Promise<Object> => {
        return new Promise((resolve, reject) => {
            this.connection.once("ready", () => {
                this.connection.openBox("INBOX", (error, box) => {
                    this.connection.append(buffer.toString("utf8"), {mailbox: "INBOX.Sent", flags: "\\SEEN"}, (error) => {
                        this.connection.end();
                        if (error) {
                            reject(ResponseError(error));
                        } else {
                            resolve(ResponseSuccess);
                        }
                    });
                });
            });
            this.connection.connect();
        });
    }
}
