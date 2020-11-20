import { getRepository, Repository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '../entities/Payment';

class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async findLast(user_id: string): Promise<Payment | undefined> {
    const payment = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
      take: 1,
    });

    return payment[0];
  }

  public async create(paymentData: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create(paymentData);
    await this.ormRepository.save(payment);
    return payment;
  }
}

export default PaymentsRepository;
