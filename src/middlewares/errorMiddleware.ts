import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../protocols/index.protocol"

export default function errorHandler(error: ApplicationError, req: Request, res: Response, next: NextFunction) {

    switch (error.type) {
        case "email_ja_cadastrado":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
        case "email_nao_cadastrado":
            return res.status(httpStatus.UNAUTHORIZED).send(error.message);
        case "senha_incorreta":
            return res.status(httpStatus.UNAUTHORIZED).send(error.message);
        default:
            console.log(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
    }
}