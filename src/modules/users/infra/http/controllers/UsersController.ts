import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, code, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, code, email, password });

    const { id } = user;
    return response.json({ id, name, code, email });
  }
}
