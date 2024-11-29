import { Router, Request, Response } from 'express';
import { UserDbModelService } from '../../domain/services/user-db-model.service';
import { STATUS } from '../enums/status.enum';
import { JwtService } from '../../infrastructure/services/jwt.service';
import { AccessTokenDbModelService } from '../../domain/services/access-token-db-model.service';
import { UpdateUserDto } from '../../application/commands/dtos/input/update-user.dto';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { UpdateUserHandler } from '../../application/commands/handlers/update-user.handler';
import { SaveAccessTokenRepositoryHandler } from '../../infrastructure/repositories/commands/save-access-token.repository';
import { UpdateUserRepositoryHandler } from '../../infrastructure/repositories/commands/update-user.repository';
import { CustomResponse } from '../../../utilities/custom-response';

const router = Router();

const jwtService = new JwtService();
const accessTokenDatabase = new AccessTokenDbModelService();
const saveAccessTokenRepo = new SaveAccessTokenRepositoryHandler(accessTokenDatabase);
const userDatabase = new UserDbModelService();
const updateUserRepository = new UpdateUserRepositoryHandler(userDatabase);
const updateUserHandler = new UpdateUserHandler(updateUserRepository, saveAccessTokenRepo, jwtService);


router.put('/', async (request: Request, response: Response): Promise<void> => {
  const { firstName, lastName, email, password }: UpdateUserDto = request.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error('All the fields must be filled');
  }

  try {
    const command = new UpdateUserCommand(firstName, lastName, email, password);
    const result = await updateUserHandler.execute(command);
    const customResponse = new CustomResponse(
      200,
      STATUS.SUCCESS,
      result,
      '',
      "User updated successfully"
    );

    response.status(customResponse.statusCode).json(customResponse.toJSON());
  } catch (error: any) {
    const customResponse = new CustomResponse(
      500,
      STATUS.ERROR,
      '',
      error.message || error,
      "Failed to update user"
    );

    response.status(customResponse.statusCode).json(customResponse.toJSON());
  }
});

export default router;
