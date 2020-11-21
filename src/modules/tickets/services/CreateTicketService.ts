import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITicketsRepository from '../repositories/ITicketsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';

interface IRequest {
  value: number;
  userId: string;
}

@injectable()
class CreateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ value, userId }: IRequest): Promise<Ticket> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new AppError('Usuário não cadastrado.');

    const ticket = await this.ticketsRepository.findByUserId(userId);

    if (!ticket) {
      const newTicket = await this.ticketsRepository.create({
        value,
        user_id: userId,
      });
      return newTicket;
    }

    ticket.value = value;
    await this.ticketsRepository.save(ticket);
    return ticket;
  }
}

export default CreateTicketService;
