import { uuid } from 'uuidv4';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';
import Ticket from '../../infra/typeorm/entities/Ticket';

class FakeTicketsRepository implements ITicketsRepository {
  private tickets: Ticket[] = [];

  public async findByUserId(id: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.find(tkt => tkt.user_id === id);
    return ticket;
  }

  public async create(ticketData: ICreateTicketDTO): Promise<Ticket> {
    const ticket = new Ticket();
    Object.assign(ticket, { id: uuid(), ...ticketData });
    this.tickets.push(ticket);
    return ticket;
  }

  public async save(ticket: Ticket): Promise<Ticket> {
    const findIndex = this.tickets.findIndex(tkt => tkt.id === ticket.id);
    this.tickets[findIndex] = ticket;
    return ticket;
  }
}

export default FakeTicketsRepository;
