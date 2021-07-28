import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IUser, User } from '../user/user/user';
import { Role } from './auth.enum';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IServerAuthResponse {
  accessToken: string;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
};

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

@Injectable()
export abstract class AuthService implements IAuthService {
  public readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  public readonly currentUser$ = new BehaviorSubject<IUser>(new User());

  public constructor() {}

  public login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  public logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }
  public getToken(): string {
    throw new Error('Method not implemented.');
  }
}
