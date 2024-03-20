import { Router } from 'express';
import { validateAuth } from '../middlewares/validateAuth';
import * as tasksController from "../controllers/tasks.controller";

const tasksRouter = Router();

tasksRouter.post('/task', validateAuth, tasksController.postTaskController);

export { tasksRouter };
