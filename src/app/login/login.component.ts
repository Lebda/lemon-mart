import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { BaseComponent } from '../common/base.component';

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
    private route: ActivatedRoute
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
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
      ],
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
            this.router.navigate([this.redirectUrl || '/manager']);
          })
        )
        .subscribe()
    );
  }
}
