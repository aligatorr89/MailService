import { Request, Response } from "express";
import { IMAP } from "../classes/imap";
import { SMTP } from "../classes/smtp";
import eol from "eol";

export const verify = (req: Request, res: Response): Promise<Response> => {
    const Smtp = new SMTP(req.body.smtp);
    return Smtp.verify()
    .then(re => res.send(re))
    .catch(error => res.send(error));
};

export const send = (req: Request, res: Response): Promise<Response> => {
    const Smtp = new SMTP(req.body.smtp);
    return Smtp.send(req.body.mail)
    .then(re => res.send(re))
    .catch(error => res.send(error));
};

export const sendAndCopyToSentFolder = (req: Request, res: Response): Promise<Response> => {
    const Smtp = new SMTP(req.body.smtp);
    const Imap = new IMAP(req.body.imap);
    req.body.mail.html = eol.crlf(req.body.mail.html);
    return Smtp.send(req.body.mail)
    .then(() => Smtp.copyToSentFolder(req.body.mail, Imap))
    .then(re => res.send(re))
    .catch(error => res.send(error));
};
