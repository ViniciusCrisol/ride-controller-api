import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import Log from '../infra/typeorm/entities/Log';

interface IRequest {
  value: number;
  user_id: string;
}

@injectable()
class CreateTicketService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ value, user_id }: IRequest): Promise<Log> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) throw new AppError('User does not exists.');

    const log = await this.logsRepository.create({ user_id, value });
    return log;
  }
}

export default CreateTicketService;
