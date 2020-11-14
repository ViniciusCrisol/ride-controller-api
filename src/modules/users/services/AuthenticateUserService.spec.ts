import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let user: User;
let authenticateUser: AuthenticateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('AuthnticateUser', () => {
  beforeEach(async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });
  });

  it('should be able to authenticate user with code', async () => {
    const response = await authenticateUser.execute({
      login: 'john@example',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate user with e-mail', async () => {
    const response = await authenticateUser.execute({
      login: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a wrong login', async () => {
    await expect(
      authenticateUser.execute({
        login: 'wrongJohn@example',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    await expect(
      authenticateUser.execute({
        login: 'john@example',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
