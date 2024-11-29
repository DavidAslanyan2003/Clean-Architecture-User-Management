import { IReadUserRepository } from '../../../infrastructure/interfaces/read-user-repository.interface';
import { ReadUserResultDto } from '../../commands/dtos/output/read-user-result.dto';
import { GetUserQuery } from '../get-user.query';


export class GetUserHandler {
  constructor(private readonly userReadRepository: IReadUserRepository) {}

  public async execute(query: GetUserQuery): Promise<ReadUserResultDto> {
    const user = await this.userReadRepository.read(query.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      created_at: user.created_at,
      updated_at: user.updated_at,
      email: user.email,
    };
  }
}
