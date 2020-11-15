import { getRepository, Repository } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';
import Ticket from '../entities/Ticket';

class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async findByUserId(userId: string): Promise<Ticket | undefined> {
    const ticket = await this.ormRepository.findOne({
      where: { user_id: userId },
    });

    return ticket;
  }

  public async create(ticketData: ICreateTicketDTO): Promise<Ticket> {
    const ticket = this.ormRepository.create(ticketData);
    await this.ormRepository.save(ticket);
    return ticket;
  }

  public async save(ticket: Ticket): Promise<Ticket> {
    return this.ormRepository.save(ticket);
  }
}

export default TicketsRepository;
