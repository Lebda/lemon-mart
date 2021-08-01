import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { Role } from '../auth/auth.enum';
import { AuthService } from '../auth/auth.service';
import { BaseComponent } from '../common/base.component';
import { UiService } from '../common/ui.service';
import { EmailValidation, PasswordValidation } from '../common/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public loginForm: FormGroup;
  public loginError = '';
  public redirectUrl = '';
  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    super();
    this.sink(
      route.paramMap.subscribe(
        (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
      )
    );
    this.loginForm = this.buildLoginForm();
  }

  public ngOnInit(): void {
    this.authService.logout();
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    });
  }

  public async login(submittedForm: FormGroup): Promise<void> {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)));

    this.sink(
      combineLatest([this.authService.authStatus$, this.authService.currentUser$])
        .pipe(
          filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
          tap(([authStatus, user]) => {
            this.router.navigate([
              this.redirectUrl || this.homeRoutePerRole(user.role as Role),
            ]);
            this.uiService.showToast(`Welcome ${user.fullName}! Role: ${user.role}`);
            // this.uiService.showDialog(`Welcome ${user.fullName}!`, `Role: ${user.role}`);
          })
        )
        .subscribe()
    );
  }

  private homeRoutePerRole(role: Role): string {
    switch (role) {
      case Role.Cashier:
        return '/pos';
      case Role.Clerk:
        return '/inventory';
      case Role.Manager:
        return '/manager';
      default:
        return '/user/profile';
    }
  }
}
