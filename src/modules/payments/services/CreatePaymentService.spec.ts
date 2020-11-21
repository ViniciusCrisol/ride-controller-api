import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeLogsRepository from '@modules/logs/repositories/fakes/FakeLogsRepository';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';

let user: User;
let fakeUsersRepository: FakeUsersRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let fakeLogsRepository: FakeLogsRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let createPayment: CreatePaymentService;

describe('Create Payment', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeLogsRepository = new FakeLogsRepository();
    fakePaymentsRepository = new FakePaymentsRepository();

    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeLogsRepository,
      fakeUsersRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });

    await fakeTicketsRepository.create({ user_id: user.id, value: 2.1 });
  });

  it('should be able to create a new payment.', async () => {
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });

    const payment = await createPayment.execute({ userId: user.id });
    expect(payment).toHaveProperty('id');
  });

  it('should be able to create a new payment with a payment registered.', async () => {
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });

    await createPayment.execute({ userId: user.id });

    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });

    const payment = await createPayment.execute({ userId: user.id });
    expect(payment).toHaveProperty('id');
  });

  it('should not be able to create a new payment with a non-existing user.', async () => {
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });
    await fakeLogsRepository.create({ user_id: user.id, value: 2.0 });

    await expect(
      createPayment.execute({ userId: 'nonExistingID' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new payment without logs.', async () => {
    await expect(
      createPayment.execute({ userId: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
