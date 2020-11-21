import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  code: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    code,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkCodeIsBeingUsed = await this.usersRepository.findByCode(code);
    if (checkCodeIsBeingUsed) throw new AppError('Código já cadastrado.');

    const checkEmailIsBeingUsed = await this.usersRepository.findByEmail(email);
    if (checkEmailIsBeingUsed) throw new AppError('E-mail já cadastrado.');

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      code,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
