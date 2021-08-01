import { Role } from './auth.enum';

export interface IAuthGuardData {
  expectedRoles: Role[];
}

export class AuthGuardData implements IAuthGuardData {
  public constructor(public expectedRoles = new Array<Role>()) {}

  public static build(data: IAuthGuardData): IAuthGuardData {
    if (!data) {
      return new AuthGuardData();
    }

    return new AuthGuardData(data.expectedRoles);
  }
}
