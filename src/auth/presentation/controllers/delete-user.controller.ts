import { Router, Request, Response } from 'express';
import { UserDbModelService } from '../../domain/services/user-db-model.service';
import { CustomResponse } from '../../utilities/custom-response';
import { STATUS } from '../enums/status.enum';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';
import { DeleteUserHandler } from '../../application/commands/handlers/delete-user.handler';
import { DeleteUserRepositoryHandler } from '../../infrastructure/repositories/commands/delete-user.repository';

const router = Router();


const userDatabase = new UserDbModelService();
const deleteUserRepository = new DeleteUserRepositoryHandler(userDatabase);
const deleteUserHandler = new DeleteUserHandler(deleteUserRepository);


router.delete('/:userId', async (request: Request, response: Response): Promise<void> => {
  const { userId } = request.params;

  try {
    const command = new DeleteUserCommand(userId);
    const result = await deleteUserHandler.execute(command);
    const customResponse = new CustomResponse(
      200,
      STATUS.SUCCESS,
      result,
      '',
      "User deleted successfully"
    );

    response.status(customResponse.statusCode).json(customResponse.toJSON());
  } catch (error: any) {
    const customResponse = new CustomResponse(
      500,
      STATUS.ERROR,
      '',
      error.message || error,
      "Failed to delete the user"
    );

    response.status(customResponse.statusCode).json(customResponse.toJSON());
  }
});

export default router;
