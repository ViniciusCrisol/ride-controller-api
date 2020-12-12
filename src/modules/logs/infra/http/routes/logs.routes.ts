import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import LogsController from '../controllers/LogsController';

const logsRouter = Router();
logsRouter.use(ensureAuthenticated);
const logsController = new LogsController();

logsRouter.post('/', logsController.create);
logsRouter.get('/', logsController.index);

export default logsRouter;
