import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import LogsRepository from '@modules/logs/infra/typeorm/repositories/LogsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITicketsRepository>(
  'TicketsRepository',
  TicketsRepository,
);

container.registerSingleton<ILogsRepository>('LogsRepository', LogsRepository);
