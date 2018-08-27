import { Request, Response } from "express";
import { IMAP } from "../classes/imap";
import { SMTP } from "../classes/smtp";

export const verify = (req: Request, res: Response): Promise<Response> => {
    const Smtp = new SMTP(req.body.smtp);
    return Smtp.verify()
    .then(re => res.send(re));
};

export const send = (req: Request, res: Response): Promise<Response> => {
    const Smtp = new SMTP(req.body.smtp);
    return Smtp.send(req.body.mail)
    .then(re => res.send(re));
};

export const sendAndCopyToSentFolder = (req: Request, res: Response): Promise<Response> => {
    const Smtp = new SMTP(req.body.smtp);
    const Imap = new IMAP(req.body.imap);
    return Smtp.send(req.body.mail)
    .then(() => Smtp.copyToSentFolder(req.body.mail, Imap))
    .then(re => res.send(re));
};
