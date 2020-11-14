import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value } = request.body;
    const { id: user_id } = request.user;

    const createTicket = container.resolve(CreateTicketService);
    const { id, user } = await createTicket.execute({ user_id, value });

    return response.json({ id, user: user.name, value });
  }
}
