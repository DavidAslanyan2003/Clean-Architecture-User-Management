import { IReadUsersListRepository } from '../../../infrastructure/interfaces/read-users-list-repository.interface';
import { ReadUserResultDto } from '../../commands/dtos/output/read-user-result.dto';


export class GetUsersListHandler {
  constructor(private readonly userReadRepository: IReadUsersListRepository) {}

  public async execute(): Promise<ReadUserResultDto[]> {
    const users = await this.userReadRepository.read();

    if (!users?.length) {
      throw new Error('User not found');
    }

    return users;
  }
}
