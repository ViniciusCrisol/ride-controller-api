import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token, last_payment } = await authenticateUser.execute({
      login,
      password,
    });

    const { id, name, code } = user;
    return response.json({ user: { id, name, code }, last_payment, token });
  }
}
