import { IGetUserQuery } from "./interfaces/get-user-query.interface";


export class GetUserQuery implements IGetUserQuery {
  constructor(public readonly userId: string) {}
}
