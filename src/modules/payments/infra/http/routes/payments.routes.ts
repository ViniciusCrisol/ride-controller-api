import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '../controllers/PaymentsController';

const paymentsRouter = Router();
paymentsRouter.use(ensureAuthenticated);
const paymentsController = new PaymentsController();

paymentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: { value: Joi.number().required().min(0.01) },
  }),
  paymentsController.create,
);

export default paymentsRouter;
