import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema';
import { createUserSchema, loginSchema, userInfoSchema } from "../schemas/index.schemas"
import * as sessionsController from "../controllers/sessions.controller"

const sessionsRouter = Router();

sessionsRouter.post('/user', validateSchema(createUserSchema), sessionsController.postUserController);

sessionsRouter.put('/user/:id', validateSchema(createUserSchema), sessionsController.updateUserController);

sessionsRouter.delete('/user/:id', sessionsController.deleteUserController);

sessionsRouter.post('/sign_in', validateSchema(loginSchema), sessionsController.signInController);

sessionsRouter.post('/user_info', validateSchema(userInfoSchema), sessionsController.userInfoController);

export { sessionsRouter };
