import ICreateTicketDTO from '../dtos/ICreateTicketDTO';
import Ticket from '../infra/typeorm/entities/Ticket';

export default interface ITicketsRepository {
  save(ticket: Ticket): Promise<Ticket>;
  create(ticketData: ICreateTicketDTO): Promise<Ticket>;
  findByUserId(user_id: string): Promise<Ticket | undefined>;
}
