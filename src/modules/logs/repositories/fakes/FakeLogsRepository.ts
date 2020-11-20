import { uuid } from 'uuidv4';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';
import IFoundLogDTO from '@modules/logs/dtos/IFoundLogDTO';
import Log from '../../infra/typeorm/entities/Log';

class FakeLogsRepository implements ILogsRepository {
  private logs: Log[] = [];

  public async delete(log: Log): Promise<void> {
    const logs = this.logs.filter(lg => lg.id !== log.id);
    this.logs = logs;
  }

  public async find(user_id: string): Promise<Log[]> {
    const logs = this.logs.filter(lg => lg.user_id !== user_id);
    return logs;
  }

  public async findByDate({ date, user_id }: IFoundLogDTO): Promise<Log[]> {
    if (!date) {
      const logs = this.logs.filter(lg => lg.user_id === user_id);
      return logs;
    }

    const logs = this.logs.filter(
      lg => lg.created_at > date && lg.user_id === user_id,
    );
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
