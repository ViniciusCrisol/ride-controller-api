import ICreateTicketDTO from '../dtos/ICreateTicketDTO';
import Ticket from '../infra/typeorm/entities/Ticket';

export default interface ITicketsRepository {
  save(ticket: Ticket): Promise<Ticket>;
  create(data: ICreateTicketDTO): Promise<Ticket>;
  findByUserId(userId: string): Promise<Ticket | undefined>;
}
