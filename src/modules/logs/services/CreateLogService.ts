import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import Log from '../infra/typeorm/entities/Log';

interface IRequest {
  userId: string;
}

@injectable()
class CreateTicketService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Log> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('User does not exists.');

    const ticket = await this.ticketsRepository.findByUserId(userId);
    if (!ticket) throw new AppError('You should create a ticket.');

    const log = await this.logsRepository.create({
      user_id: userId,
      value: ticket.value,
    });
    return log;
  }
}

export default CreateTicketService;
