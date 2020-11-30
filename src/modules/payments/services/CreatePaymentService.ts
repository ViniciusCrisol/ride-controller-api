import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

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

  public async execute({ userId }: IRequest): Promise<Payment> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('Usuário não cadastrado.');

    const lastPayment = await this.paymentsRepository.findLast(userId);
    const logs = await this.logsRepository.findByDate({
      date: lastPayment?.created_at,
      user_id: userId,
    });

    if (logs.length <= 0) throw new AppError('Nenhum gasto encontrado.');

    const logsValue = logs.reduce((value, log) => Number(log.value) + value, 0);
    const payment = await this.paymentsRepository.create({
      user_id: userId,
      value: logsValue,
    });

    return payment;
  }
}

export default CreatePaymentService;
