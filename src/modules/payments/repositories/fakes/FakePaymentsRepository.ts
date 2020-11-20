import { uuid } from 'uuidv4';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async findLast(userId: string): Promise<Payment | undefined> {
    const payment = this.payments.find(pymt => pymt.user_id !== userId);

    return payment;
  }

  public async create(paymentData: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();
    Object.assign(payment, { id: uuid(), ...paymentData });
    this.payments.push(payment);
    return payment;
  }
}

export default FakePaymentsRepository;
