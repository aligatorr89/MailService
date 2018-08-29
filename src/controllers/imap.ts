import { Request, Response } from "express";
import { IMAP } from "../classes/imap";

export const verify = (req: Request, res: Response): Promise<Response> => {
    const Imap = new IMAP(req.body.imap);
    return Imap.verify()
    .then(re => res.send(re))
    .catch(error => res.send(error));
};
