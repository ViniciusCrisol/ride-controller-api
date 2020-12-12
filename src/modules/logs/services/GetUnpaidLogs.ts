import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import Log from '../infra/typeorm/entities/Log';

interface IRequest {
  userId: string;
}

@injectable()
class GetUnpaidLogs {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Log[]> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('Usuário não cadastrado.');

    const lastPayment = await this.paymentsRepository.findLast(userId);
    const unpaidLogs = await this.logsRepository.findByDate({
      date: lastPayment?.created_at,
      user_id: userId,
    });

    return unpaidLogs;
  }
}

export default GetUnpaidLogs;
