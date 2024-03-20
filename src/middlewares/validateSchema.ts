import { ObjectSchema } from 'joi';
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body, { abortEarly: false });

		if (validation.error) {

			let errorDetails: string[] = validation.error.details.map(x => {
				let field = x.message.split(`"`)[1]
				return field;
			})

			let errorString: string = errorDetails.join(", ")

			return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
				message: "O objeto enviado está incorreto, por favor consulte a documentação",
				hint: `Campo(s) incorreto(s): ${errorString}`
			})
		}

		next();
	}
}