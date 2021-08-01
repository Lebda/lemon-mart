import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { UiService } from '../common/ui.service';
import { IAuthGuardData } from './auth-guard.data';
import { Role } from './auth.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  public constructor(
    protected authService: AuthService,
    protected router: Router,
    private uiService: UiService
  ) {}

  public canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute);
  }

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const roleMatch = this.checkRoleMatch(authStatus.userRole, route);
        const allowLogin = authStatus.isAuthenticated && roleMatch;
        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch);
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          });
        }
        return allowLogin;
      }),
      take(1) // complete the observable for the guard to work
    );
  }

  private checkRoleMatch(role: Role, route?: ActivatedRouteSnapshot): boolean {
    const authData = route?.data as IAuthGuardData;
    if (!authData?.expectedRoles) {
      return true;
    }
    return authData.expectedRoles.findIndex((item) => item === role) !== -1;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean): void {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }

    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource');
    }
  }

  public getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return '';
    }

    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/');
  }
}
