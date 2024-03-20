import * as sessionsRepository from "../repository/sessions.repository";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function validateAuth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    
    const token: string = authorization?.replace("Bearer ", "");

    if (!token) return res.status(httpStatus.UNAUTHORIZED).send("Token ausente/incorreto nos headers");

    let session = await sessionsRepository.readUserInfoByToken(token);

    res.locals.session = session;

    next();
}