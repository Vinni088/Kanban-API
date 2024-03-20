import { Request, Response } from "express";
import { SessionInfo } from "../protocols/index.protocol"
import httpStatus from "http-status";

const log = console.log;

export async function postTaskController(req: Request, res: Response) {
    const { } = req.body;
    const session: SessionInfo = res.locals.session;

    return res.status(httpStatus.OK).send(`Ùsuario de id ${session.id} logado!`);
}
