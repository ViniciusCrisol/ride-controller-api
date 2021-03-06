import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  save(user: User): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByCode(code: string): Promise<User | undefined>;
  findByEmail(code: string): Promise<User | undefined>;
}
