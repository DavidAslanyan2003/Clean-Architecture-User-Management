import { Router, Request, Response } from 'express';
import { CreateUserDto } from '../../application/commands/dtos/input/create-user.dto';
import { UserDbModelService } from '../../domain/services/user-db-model.service';
import { CustomResponse } from '../../utilities/custom-response';
import { STATUS } from '../enums/status.enum';
import { JwtService } from '../../infrastructure/services/jwt.service';
import { AccessTokenDbModelService } from '../../domain/services/access-token-db-model.service';
import { CreateUserHandler } from '../../application/commands/handlers/create-user.handler';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserRepositoryHandler } from '../../infrastructure/repositories/commands/create-user.repository';
import { SaveAccessTokenRepositoryHandler } from '../../infrastructure/repositories/commands/save-access-token.repository';

const router = Router();

const jwtService = new JwtService();
const accessTokenDatabase = new AccessTokenDbModelService();
const saveAccessTokenRepo = new SaveAccessTokenRepositoryHandler(accessTokenDatabase);
const userDatabase = new UserDbModelService();
const createUserRepository = new CreateUserRepositoryHandler(userDatabase);
const createUserHandler = new CreateUserHandler(createUserRepository, saveAccessTokenRepo, jwtService);


router.post('/', async (request: Request, response: Response): Promise<void> => {
  const { firstName, lastName, email, password }: CreateUserDto = request.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error('All the fields must be filled');
  }

  try {
    const command = new CreateUserCommand(firstName, lastName, email, password);
    const result = await createUserHandler.execute(command);
    const customResponse = new CustomResponse(
      200,
      STATUS.SUCCESS,
      result,
      '',
      "User created successfully"
    );

    response.status(customResponse.statusCode).json(customResponse.toJSON());
  } catch (error: any) {
    const customResponse = new CustomResponse(
      500,
      STATUS.ERROR,
      '',
      error.message || error,
      "Failed to create user"
    );

    response.status(customResponse.statusCode).json(customResponse.toJSON());
  }
});

export default router;
