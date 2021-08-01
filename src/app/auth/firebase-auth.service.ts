import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AuthService,
  IServerAuthResponse,
  IAuthStatus,
  defaultAuthStatus,
} from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User, IUser } from '../user/user/user';
import { Role } from './auth.enum';

interface IJwtToken {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class FirebaseAuthService extends AuthService {
  public constructor(private afAuth: AngularFireAuth) {
    super();
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    const serverResponse$ = new Subject<IServerAuthResponse>();

    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        const firebaseUser: firebase.User | null = res.user;
        firebaseUser?.getIdToken().then(
          (token: any) =>
            serverResponse$.next({ accessToken: token } as IServerAuthResponse),
          (err: any) => serverResponse$.error(err)
        );
      },
      (err) => serverResponse$.error(err)
    );

    return serverResponse$;
  }

  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    if (!token) {
      return defaultAuthStatus;
    }

    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: Role.None,
    };
  }
  protected getCurrentUser(): Observable<IUser> {
    return this.afAuth.user.pipe(map(this.transformFirebaseUser));
  }

  private transformFirebaseUser(firebaseUser: firebase.User | null): IUser {
    if (!firebaseUser) {
      return new User();
    }

    // tslint:disable-next-line: no-unused-declaration
    const help = {
      name: {
        first: firebaseUser?.displayName?.split(' ')[0] || 'Firebase',
        last: firebaseUser?.displayName?.split(' ')[1] || 'User',
      },
      picture: firebaseUser.photoURL,
      email: firebaseUser.email,
      _id: firebaseUser.uid,
      role: Role.None,
    } as IUser;

    return User.Build(help);
  }

  public logout(): void {
    if (this.afAuth) {
      this.afAuth.signOut();
    }
    this.clearToken();
    this.authStatus$.next(defaultAuthStatus);
  }
}
