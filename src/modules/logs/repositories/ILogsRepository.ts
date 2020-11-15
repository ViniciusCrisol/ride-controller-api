import ICreateLogDTO from '../dtos/ICreateLogDTO';
import Log from '../infra/typeorm/entities/Log';

export default interface ILogsRepository {
  create(data: ICreateLogDTO): Promise<Log>;
  find(userId: string): Promise<Log[]>;
  delete(log: Log): Promise<void>;
}
