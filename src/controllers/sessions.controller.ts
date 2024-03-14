import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function signUpController(req: Request, res: Response) {
    const {  } = req.body;

    return res.status(httpStatus.OK).send("Ok: sign up");
}

export async function signInController(req: Request, res: Response) {
    const {  } = req.body;

    return res.status(httpStatus.OK).send("Ok: sign in");
}

export async function userInfoController(req: Request, res: Response) {
    const {  } = req.body;

    return res.status(httpStatus.OK).send("Ok: user info");
}