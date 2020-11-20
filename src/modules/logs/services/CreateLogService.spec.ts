import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeLogsRepository from '../repositories/fakes/FakeLogsRepository';
import CreateLogService from './CreateLogService';

let user: User;
let createLog: CreateLogService;
let fakeUsersRepository: FakeUsersRepository;
let fakeLogsRepository: FakeLogsRepository;

describe('CreateLog', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeLogsRepository = new FakeLogsRepository();
    createLog = new CreateLogService(fakeLogsRepository, fakeUsersRepository);

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });
  });

  it('should be able to create a new log', async () => {
    const log = await createLog.execute({
      userId: user.id,
    });

    expect(log).toHaveProperty('id');
  });

  it('should not be able to create a new log with a non-existing user', async () => {
    await expect(
      createLog.execute({
        userId: 'NonExistingID',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
