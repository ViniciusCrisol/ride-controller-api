import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute({ login, password }: IRequest): Promise<any> {
    const userFoundedByCode = await this.usersRepository.findByCode(login);
    const userFoundedByEmail = await this.usersRepository.findByEmail(login);

    if (!userFoundedByEmail && !userFoundedByCode)
      throw new AppError('Combinação usuário/senha inválida.');

    const user = (userFoundedByCode || userFoundedByEmail) as User;

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched)
      throw new AppError('Combinação usuário/senha inválida.');

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const last_payment = await this.paymentsRepository.findLast(user.id);

    return { user, token, last_payment };
  }
}

export default AuthenticateUserService;
