import { uuid } from 'uuidv4';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';
import Log from '../../infra/typeorm/entities/Log';

class FakeLogsRepository implements ILogsRepository {
  private logs: Log[] = [];

  public async delete(log: Log): Promise<void> {
    const logs = this.logs.filter(post => post.id !== log.id);

    this.logs = logs;
  }

  public async find(userId: string): Promise<Log[]> {
    const logs = this.logs.filter(post => post.user_id !== userId);

    return logs;
  }

  public async create(logData: ICreateLogDTO): Promise<Log> {
    const log = new Log();
    Object.assign(log, { id: uuid(), ...logData });
    this.logs.push(log);
    return log;
  }
}

export default FakeLogsRepository;
