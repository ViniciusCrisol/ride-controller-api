import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTicketsRepository from '../repositories/fakes/FakeTicketsRepository';
import CreateTicketService from './CreateTicketService';

let user: User;
let fakeUsersRepository: FakeUsersRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let createTicket: CreateTicketService;

describe('CreateTicket', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTicketsRepository = new FakeTicketsRepository();

    createTicket = new CreateTicketService(
      fakeTicketsRepository,
      fakeUsersRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      code: 'john@example',
      email: 'john@example.com',
      password: 'password',
    });
  });

  it('should be able to create a new ticket', async () => {
    const ticket = await createTicket.execute({ userId: user.id, value: 2.0 });
    expect(ticket).toHaveProperty('id');
  });

  it('should not be able to create a new ticket with a non-existing user', async () => {
    await expect(
      createTicket.execute({
        userId: 'NonExistingID',
        value: 2.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a ticket with a new value', async () => {
    await createTicket.execute({ userId: user.id, value: 2.0 });
    const updatedTicket = await createTicket.execute({
      userId: user.id,
      value: 2.5,
    });
    expect(updatedTicket.value).toEqual(2.5);
  });
});
