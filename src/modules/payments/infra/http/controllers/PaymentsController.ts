import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLogService from '@modules/payments/services/CreateLogService';

export default class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value } = request.body;
    const { id: user_id } = request.user;

    const createLog = container.resolve(CreateLogService);
    await createLog.execute({ user_id });

    return response.json({ value });
  }
}
