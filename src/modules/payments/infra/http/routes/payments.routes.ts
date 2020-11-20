import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '../controllers/PaymentsController';

const paymentsRouter = Router();
paymentsRouter.use(ensureAuthenticated);
const paymentsController = new PaymentsController();

paymentsRouter.post('/', paymentsController.create);

export default paymentsRouter;
