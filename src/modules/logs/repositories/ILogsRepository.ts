import ICreateLogDTO from '../dtos/ICreateLogDTO';
import IFoundLogDTO from '../dtos/IFoundLogDTO';
import Log from '../infra/typeorm/entities/Log';

export default interface ILogsRepository {
  create(logData: ICreateLogDTO): Promise<Log>;
  delete(log: Log): Promise<void>;
  find(user_id: string): Promise<Log[]>;
  findByDate(logData: IFoundLogDTO): Promise<Log[]>;
}
