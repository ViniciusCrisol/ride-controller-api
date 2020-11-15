import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import logsRouter from '@modules/logs/infra/http/routes/logs.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/logs', logsRouter);

export default routes;
