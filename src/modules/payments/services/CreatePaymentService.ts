import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class CreatePaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('User does not exists.');

    const lastPayment = await this.paymentsRepository.findLast(userId);

    const logs = await this.logsRepository.findByDate({
      date: lastPayment?.created_at,
      user_id: userId,
    });

    const logsValue = logs.reduce((value, log) => log.value + value, 0);
    await this.paymentsRepository.create({ user_id: userId, value: logsValue });
  }
}

export default CreatePaymentService;
