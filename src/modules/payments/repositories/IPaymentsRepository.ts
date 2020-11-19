import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import Payment from '../infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  find(userId: string): Promise<Payment[]>;
}
