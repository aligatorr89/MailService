import imap from "imap";
import { Config, Box } from "imap";

import { IResponseSuccess, ResponseSuccess } from "../util/response_success";
import { IResponseError, ResponseError } from "../util/response_error";

export class IMAP {
    public connection: imap;
    constructor(config: Config) {
        this.connection = new imap(config);
        this.connection.connect();
    }
    public copyToSentFolder = (buffer: Buffer): Promise<IResponseSuccess | IResponseError> => {
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
        });
    }
}
