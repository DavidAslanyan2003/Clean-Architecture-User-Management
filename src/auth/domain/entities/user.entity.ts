import { UserStatus } from "../../presentation/enums/user-status.enum";
import { generateNewDate } from "../../utilities/generate-date";
import { generateUUID } from "../../utilities/generate-uuid";
import { Email } from "../value-objects/email.value-object";

export class User {
  public readonly id: string = generateUUID().id;
  public readonly created_at: Date = generateNewDate();
  public readonly updated_at: Date | null;
  public status?: UserStatus = UserStatus.ACTIVE

  public constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: Email,
    public readonly password: string,
    updated_at?: Date | null
  ) {
    this.updated_at = updated_at ?? null
  }
}
