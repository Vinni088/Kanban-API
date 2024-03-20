import * as sessionsRepository from "../repository/sessions.repository";
import { Request, Response } from "express";
import { v4 as tokenGeneretor } from "uuid";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const log = console.log;

export async function postUserController(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const hash: string = bcrypt.hashSync(password, 10);

    let checkUser = await sessionsRepository.checkUserEmail(email);

    if (checkUser.length > 0) {
        log("Pre existing user found")
        throw ({ type: 'unprocessable_entity', message: 'O email informado já pertence à uma conta.' })
    }

    let user = await sessionsRepository.createUser(name, email, hash);

    return res.status(httpStatus.OK).send(user);
}

export async function updateUserController(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { id } = req.params;

    let numberId = Number(id);

    if (isNaN(numberId)) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Id não numerico enviado");
    }

    let checkUser = await sessionsRepository.checkUserId(numberId);

    if (checkUser.length === 0) {
        log("No user found")
        throw ({ type: 'unauthorized', message: 'O Id informado não pertence à uma conta.' })
    }

    const hash: string = bcrypt.hashSync(password, 10);

    await sessionsRepository.updateUser(numberId, name, email, hash);

    return res.status(httpStatus.ACCEPTED).send("Informações da conta atualizadas.");
}

export async function deleteUserController(req: Request, res: Response) {
    const { id } = req.params;
    let numberId = Number(id);

    if (isNaN(numberId)) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Id não numerico enviado");
    }

    let checkUser = await sessionsRepository.checkUserId(numberId);

    if (checkUser.length === 0) {
        log("No user found");
        throw ({ type: 'unauthorized', message: 'O email informado não pertence à uma conta.' });
    }

    await sessionsRepository.deleteUser(numberId);

    return res.status(httpStatus.ACCEPTED).send("Usuario deletado");
}

export async function signInController(req: Request, res: Response) {
    const { email, password } = req.body;

    let checkUser = await sessionsRepository.checkUserEmail(email);

    if (checkUser.length === 0) {
        log("No user found");
        throw ({ type: 'unauthorized', message: 'O email informado não pertence à uma conta.' })
    }

    let user = checkUser[0];

    const checkPassword: boolean = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
        log("Wrong password");
        throw ({ type: 'unauthorized', message: 'A senha enviada está incorreta' });
    }

    let session: { id: number, user_id: number, token: string };

    if (user.sessions.length === 0) {
        let token: string = tokenGeneretor();
        session = await sessionsRepository.createSession(user.id, token);
    } else {
        let newToken: string = tokenGeneretor();
        await sessionsRepository.updateSession(user.id, newToken);
        session = await sessionsRepository.readSessionById(user.id);
    }

    log(session);

    return res.status(httpStatus.OK).send(session);
}

export async function userInfoController(req: Request, res: Response) {
    const { token } = req.body;

    let userInfo = await sessionsRepository.readUserInfoByToken(token);

    if (userInfo === null) {
        log("Invalid Token");
        throw ({ type: 'unauthorized', message: 'Token inválido' })
    }

    return res.status(httpStatus.OK).send(userInfo);
}