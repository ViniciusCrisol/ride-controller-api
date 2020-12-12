import { getRepository, MoreThan, Repository } from 'typeorm';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';
import IFoundLogDTO from '@modules/logs/dtos/IFoundLogDTO';
import Log from '../entities/Log';

class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async find(user_id: string): Promise<Log[]> {
    const logs = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });
    return logs;
  }

  public async findByDate({ date, user_id }: IFoundLogDTO): Promise<Log[]> {
    if (!date) {
      const logs = await this.ormRepository.find({ where: { user_id } });
      return logs;
    }

    const logs = await this.ormRepository.find({
      where: { user_id, created_at: MoreThan(date) },
    });
    return logs;
  }

  public async create(logData: ICreateLogDTO): Promise<Log> {
    const log = this.ormRepository.create(logData);
    await this.ormRepository.save(log);
    return log;
  }

  public async delete(log: Log): Promise<void> {
    await this.ormRepository.remove(log);
  }
}

export default LogsRepository;
