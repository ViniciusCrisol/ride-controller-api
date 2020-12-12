import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value } = request.body;
    const { id: userId } = request.user;

    const createTicket = container.resolve(CreateTicketService);
    const { created_at } = await createTicket.execute({ userId, value });

    return response.json({ created_at, value });
  }
}
