import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import Payment from '../infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
  create(paymentData: ICreatePaymentDTO): Promise<Payment>;
  findLast(user_id: string): Promise<Payment | undefined>;
}
