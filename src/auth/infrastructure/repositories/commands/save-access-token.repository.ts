import { SaveAccessTokenDto } from "../../../application/commands/dtos/input/save-access-token.dto";
import { SaveAccessTokenResultDto } from "../../../application/commands/dtos/output/save-access-token-result.dto";
import { AccessTokenDbModelService } from "../../../domain/services/access-token-db-model.service";
import { ISaveAccessTokenRepository } from "../../interfaces/save-access-token-repository.interface";


export class SaveAccessTokenRepositoryHandler implements ISaveAccessTokenRepository {
  private readonly accessTokenDbModelService: AccessTokenDbModelService;

  public constructor(accessTokenDbModelService: AccessTokenDbModelService) {
    this.accessTokenDbModelService = accessTokenDbModelService;
  }

  public async save(saveAccessTokenDto: SaveAccessTokenDto): Promise<SaveAccessTokenResultDto> {
    const savedAccessToken = await this.accessTokenDbModelService.saveAccessToken(saveAccessTokenDto);

    return {
      id: savedAccessToken.id,
      userId: savedAccessToken.userId,
      token: savedAccessToken.token,
      createdAt: savedAccessToken.createdAt,
      updatedAt: savedAccessToken.updatedAt,
    }
  }
}