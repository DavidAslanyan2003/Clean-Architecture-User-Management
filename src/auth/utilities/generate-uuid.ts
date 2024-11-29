import { Uuid } from "../domain/value-objects/uuid.value-object";

export const generateUUID = (): Uuid => {
  return new Uuid();
}
