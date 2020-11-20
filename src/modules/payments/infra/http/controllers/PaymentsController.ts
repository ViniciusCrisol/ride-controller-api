import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLogService from '@modules/payments/services/CreatePaymentService';

export default class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const createPayment = container.resolve(CreateLogService);
    const v = await createPayment.execute({ userId });

    return response.json(v);
  }
}
