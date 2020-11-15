import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLogService from '@modules/logs/services/CreateLogService';

export default class LogsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value } = request.body;
    const { id: user_id } = request.user;

    const createLog = container.resolve(CreateLogService);
    const { id, created_at } = await createLog.execute({ user_id, value });

    return response.json({ id, created_at, value });
  }
}