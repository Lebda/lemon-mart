import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public displayLogin = true;
  public isAuthenticated$: Observable<boolean>;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    super();
    this.isAuthenticated$ = this.authService.authStatus$.pipe(
      map((status) => status.isAuthenticated)
    );
  }

  public ngOnInit(): void {}

  public login(): void {
    this.authService.login('manager@test.com', '12345678');

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager']);
        })
      )
      .subscribe();
  }
}
