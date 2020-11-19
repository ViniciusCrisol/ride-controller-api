import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

interface IRequest {
  user_id: string;
}

@injectable()
class CreateTicketService {
  constructor(
    @inject('PaymentsRepository')
    private logsRepository: IPaymentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    console.log(user_id);
  }
}

export default CreateTicketService;
