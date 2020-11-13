import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      code: Joi.string().code().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRoutes;
