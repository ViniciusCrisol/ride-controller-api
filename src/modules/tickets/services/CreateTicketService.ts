import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITicketsRepository from '../repositories/ITicketsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';

interface IRequest {
  value: number;
  user_id: string;
}

@injectable()
class CreateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ value, user_id }: IRequest): Promise<Ticket> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) throw new AppError('User does not exists.');

    const ticket = await this.ticketsRepository.findByUserId(user_id);

    if (!ticket) {
      const createdTicket = await this.ticketsRepository.create({
        user_id,
        value,
      });
      return createdTicket;
    }

    ticket.value = value;
    await this.ticketsRepository.save(ticket);

    return ticket;
  }
}

export default CreateTicketService;
