import { Router, Request, Response } from 'express';
import { UserDbModelService } from '../../domain/services/user-db-model.service';
import { STATUS } from '../enums/status.enum';
import { GetUserQuery } from '../../application/queries/get-user.query';
import { GetUserHandler } from '../../application/queries/handlers/get-user.handler';
import { ReadUserRepositoryHandler } from '../../infrastructure/repositories/queries/read-user.repository';
import { CustomResponse } from '../../../utilities/custom-response';


const router = Router();

const userDatabase = new UserDbModelService();
const getUserRepository = new ReadUserRepositoryHandler(userDatabase);
const getUserHandler = new GetUserHandler(getUserRepository)

router.get('/:userId', async (request: Request, response: Response): Promise<void> => {
  const { userId } = request.params;

  try {
    const query = new GetUserQuery(userId);
    const result = await getUserHandler.execute(query);
    const customResponse = new CustomResponse(
      201,
      STATUS.SUCCESS,
      result,
      '',
      "User retrieved successfully"
    );
    response.status(customResponse.statusCode).json(customResponse.toJSON());
  } catch (error: any) {
    const customResponse = new CustomResponse(
      500,
      STATUS.ERROR,
      '',
      error.message || error,
      "Failed to retrieve the user"
    );
    response.status(customResponse.statusCode).json(customResponse.toJSON());
  }
});

export default router;
