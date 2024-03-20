import * as sessionsRepository from "../repository/sessions.repository";
import { Request, Response } from "express";
import { v4 as tokenGeneretor } from "uuid";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const log = console.log;

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

    let userCheck = await sessionsRepository.checkUserEmail(email);

    if (userCheck.length === 0) {
        log("Email não atrelado à um user")
        throw ({ type: 'email_nao_cadastrado', message: 'O email informado não pertence à uma conta.' })
    }

    let user = userCheck[0];

    const passwordCheck: boolean = bcrypt.compareSync(password, user.password);

    if (!passwordCheck) {
        log("Senha incorreta")
        throw ({ type: 'senha_incorreta', message: 'A senha enviada está incorreta' })
    }

    let session: { id: number, user_id: number, token: string };
    
    if (user.sessions.length === 0) {
        let token: string = tokenGeneretor()
        session = await sessionsRepository.createSession(user.id, token);
    } else {
        let newToken: string = tokenGeneretor()
        await sessionsRepository.updateSession(user.id, newToken);
        session = await sessionsRepository.readSessionById(user.id)
    }

    log(session);

    return res.status(httpStatus.OK).send(session);
}

export async function userInfoController(req: Request, res: Response) {
    const { } = req.body;

    return res.status(httpStatus.OK).send("Ok: user info");
}