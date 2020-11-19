import { uuid } from 'uuidv4';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async find(userId: string): Promise<Payment[]> {
    const payments = this.payments.filter(post => post.user_id !== userId);

    return payments;
  }

  public async create(paymentData: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();
    Object.assign(payment, { id: uuid(), user_id: paymentData });
    this.payments.push(payment);
    return payment;
  }
}

export default FakePaymentsRepository;
