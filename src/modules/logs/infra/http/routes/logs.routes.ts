import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import LogsController from '../controllers/LogsController';

const logsRouter = Router();
logsRouter.use(ensureAuthenticated);
const logsController = new LogsController();

logsRouter.post(
  '/',
  celebrate({ [Segments.BODY]: { value: Joi.number().required().min(0.01) } }),
  logsController.create,
);

export default logsRouter;
