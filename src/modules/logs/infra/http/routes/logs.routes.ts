import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import LogsController from '../controllers/LogsController';
import UnpaidLogsController from '../controllers/UnpaidLogsController';

const logsRouter = Router();
logsRouter.use(ensureAuthenticated);
const logsController = new LogsController();
const unpaidLogsController = new UnpaidLogsController();

logsRouter.get('/', logsController.index);
logsRouter.post('/', logsController.create);
logsRouter.get('/unpaid', unpaidLogsController.index);

export default logsRouter;
