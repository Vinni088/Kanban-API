import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../protocols/index.protocol"

export default function errorHandler(error: ApplicationError, req: Request, res: Response, next: NextFunction) {
    
    if (error.type === "email_ja_cadastrado") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    } 

    console.log(error)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
}