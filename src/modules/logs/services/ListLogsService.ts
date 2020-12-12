import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import Log from '../infra/typeorm/entities/Log';

interface IRequest {
  userId: string;
}

@injectable()
class ListLogsService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Log[]> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('Usuário não cadastrado.');

    const logs = await this.logsRepository.find(userId);
    return logs;
  }
}

export default ListLogsService;
