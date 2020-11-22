import AppError from '@shared/errors/AppError';
import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import User from '../infra/typeorm/entities/User';

let fakePaymentsRepository: FakePaymentsRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let user: User;

describe('Authnticate User', () => {
  beforeEach(async () => {
    fakeTicketsRepository = new FakeTicketsRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    authenticateUser = new AuthenticateUserService(
      fakeHashProvider,
      fakeUsersRepository,
      fakeTicketsRepository,
      fakePaymentsRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });
  });

  it('should be able to authenticate the user with code.', async () => {
    const response = await authenticateUser.execute({
      login: 'john@example',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate the user with e-mail.', async () => {
    const response = await authenticateUser.execute({
      login: 'john@example.com',
      password: 'password',
    });
    expect(response.user).toEqual(user);
    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with a wrong login.', async () => {
    await expect(
      authenticateUser.execute({
        login: 'wrongJohn@example',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateUser.execute({
        login: 'john@example',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
