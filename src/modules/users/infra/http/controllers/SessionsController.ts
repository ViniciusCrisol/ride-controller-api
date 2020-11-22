import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const data = await authenticateUser.execute({ login, password });

    const { last_payment, ticket, token, user } = data;
    const { code, id } = user;
    return response.json({ user: { code, id, ticket, last_payment, token } });
  }
}
