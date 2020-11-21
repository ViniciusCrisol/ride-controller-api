import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same code from another.', async () => {
    await createUser.execute({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example01.com',
      password: 'password',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        code: 'john@example',
        email: 'john@example02.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the same e-mail from another.', async () => {
    await createUser.execute({
      name: 'John Doe',
      code: 'john@example01',
      email: 'john@example.com',
      password: 'password',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        code: 'john@example02',
        email: 'john@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
