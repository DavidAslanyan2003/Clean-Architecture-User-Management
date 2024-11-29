import { Router, Request, Response } from 'express';
import { UserDbModelService } from '../../domain/services/user-db-model.service';
import { CustomResponse } from '../../../utilities/custom-response';
import { STATUS } from '../enums/status.enum';
import { GetUsersListHandler } from '../../application/queries/handlers/get-users-list.handler';
import { ReadUsersListRepositoryHandler } from '../../infrastructure/repositories/queries/read-users-list.repository';

const router = Router();

const userDatabase = new UserDbModelService();
const getUsersListRepository = new ReadUsersListRepositoryHandler(userDatabase);
const getUsersListHandler = new GetUsersListHandler(getUsersListRepository)

router.get('/list', async (request: Request, response: Response): Promise<void> => {

  try {
    const result = await getUsersListHandler.execute();
    const customResponse = new CustomResponse(
      201,
      STATUS.SUCCESS,
      result,
      '',
      "Users retrieved successfully"
    );
    response.status(customResponse.statusCode).json(customResponse.toJSON());
  } catch (error: any) {
    const customResponse = new CustomResponse(
      500,
      STATUS.ERROR,
      '',
      error.message || error,
      "Failed to retrieve users"
    );
    response.status(customResponse.statusCode).json(customResponse.toJSON());
  }
});

export default router;
