import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TicketsController from '../controllers/TicketsController';

const ticketsRouter = Router();
ticketsRouter.use(ensureAuthenticated);
const ticketsController = new TicketsController();

ticketsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: { value: Joi.number().required() },
  }),
  ticketsController.create,
);

export default ticketsRouter;
