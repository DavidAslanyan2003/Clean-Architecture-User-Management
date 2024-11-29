import { Uuid } from "../auth/domain/value-objects/uuid.value-object";

export const generateUUID = (): Uuid => {
  return new Uuid();
}
