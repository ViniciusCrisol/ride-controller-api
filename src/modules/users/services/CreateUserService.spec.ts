import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      code: 'john@example',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      code: 'john@example',
      password: 'password',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        code: 'john@example',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
