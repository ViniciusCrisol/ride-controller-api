import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeLogsRepository from '../repositories/fakes/FakeLogsRepository';
import CreateLogService from './CreateLogService';

let user: User;
let fakeUsersRepository: FakeUsersRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let fakeLogsRepository: FakeLogsRepository;
let createLog: CreateLogService;

describe('CreateLog', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeLogsRepository = new FakeLogsRepository();

    createLog = new CreateLogService(
      fakeLogsRepository,
      fakeUsersRepository,
      fakeTicketsRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });
  });

  it('should be able to create a new log', async () => {
    await fakeTicketsRepository.create({ value: 2.0, user_id: user.id });
    const log = await createLog.execute({ userId: user.id });
    expect(log).toHaveProperty('id');
  });

  it('should not be able to create a new log with a non-existing user', async () => {
    await expect(
      createLog.execute({
        userId: 'NonExistingID',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new log with a non-existing user ticket value', async () => {
    await expect(
      createLog.execute({
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
