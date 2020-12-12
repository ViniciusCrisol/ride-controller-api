import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetUnpaidLogs from '@modules/logs/services/GetUnpaidLogs';

export default class LogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getUnpaidLogs = container.resolve(GetUnpaidLogs);
    const logs = await getUnpaidLogs.execute({ userId });

    return response.json(logs);
  }
}
