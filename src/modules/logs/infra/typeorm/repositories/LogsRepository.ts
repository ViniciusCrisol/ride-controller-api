import { getRepository, Repository } from 'typeorm';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';
import Log from '../entities/Log';

class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async find(userId: string): Promise<Log[]> {
    const logs = await this.ormRepository.find({
      where: { user_id: userId },
    });

    return logs;
  }

  public async create(userData: ICreateLogDTO): Promise<Log> {
    const log = this.ormRepository.create(userData);
    await this.ormRepository.save(log);
    return log;
  }

  public async delete(log: Log): Promise<void> {
    await this.ormRepository.remove(log);
  }
}

export default LogsRepository;
