import { generateNewDate } from "../../utilities/generate-date";
import { generateUUID } from "../../utilities/generate-uuid";

export class AccessToken {
  public readonly id?: string = generateUUID().id;
  public readonly createdAt?: Date = generateNewDate();
  public readonly updatedAt?: Date | null;

  public constructor(
    public readonly userId: string,
    public readonly token: string,
    updated_at?: Date | null
  ) {
    this.updatedAt = updated_at ?? null
  }
}
