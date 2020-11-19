import { getRepository, Repository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '../entities/Payment';

class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async find(userId: string): Promise<Payment[]> {
    const payments = await this.ormRepository.find({
      where: { user_id: userId },
    });

    return payments;
  }

  public async create(paymentData: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create(paymentData);
    await this.ormRepository.save(payment);
    return payment;
  }
}

export default PaymentsRepository;
