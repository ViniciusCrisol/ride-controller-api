import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import Log from '../infra/typeorm/entities/Log';

interface IRequest {
  value: number;
  userId: string;
}

@injectable()
class CreateTicketService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ value, userId }: IRequest): Promise<Log> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('User does not exists.');

    const log = await this.logsRepository.create({ user_id: userId, value });
    return log;
  }
}

export default CreateTicketService;
