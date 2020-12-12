import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLogService from '@modules/logs/services/CreateLogService';
import ListLogsService from '@modules/logs/services/ListLogsService';

export default class LogsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const createLog = container.resolve(CreateLogService);
    const { id, value, created_at } = await createLog.execute({ userId });

    return response.json({ id, created_at, value });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const listLogs = container.resolve(ListLogsService);
    const logs = await listLogs.execute({ userId });

    return response.json(logs);
  }
}
