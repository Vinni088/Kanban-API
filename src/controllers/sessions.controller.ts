import * as sessionsRepository from "../repository/sessions.repository";
import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

let log = console.log;

export async function signUpController(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const hash: string = bcrypt.hashSync(password, 10);

    let check = await sessionsRepository.checkUserEmail(email);
    if (check.length > 0) {
        log("Check length > 0")
        throw ({ type: 'email_ja_cadastrado', message: 'O email informado já pertence à uma conta.' })
    }

    let user = await sessionsRepository.createUser(name, email, hash);

    return res.status(httpStatus.OK).send(user);
}

export async function signInController(req: Request, res: Response) {
    const { email, password } = req.body;

    return res.status(httpStatus.OK).send("Ok: sign in");
}

export async function userInfoController(req: Request, res: Response) {
    const { } = req.body;

    return res.status(httpStatus.OK).send("Ok: user info");
}