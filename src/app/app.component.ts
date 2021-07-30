import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService, IAuthStatus } from './auth/auth.service';
import { BaseComponent } from './common/base.component';
import { IUser } from './user/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {
  public authStatus$: Observable<IAuthStatus>;
  public user$: Observable<IUser>;
  public opened = false;

  // Wrap media observer in service !
  public constructor(
    public media: MediaObserver,
    private readonly authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    super();
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
    this.authStatus$ = this.authService.authStatus$;
    this.user$ = this.authService.currentUser$;
  }

  public ngOnInit(): void {
    this.sink(
      combineLatest([this.media.asObservable(), this.authStatus$])
        .pipe(
          tap(([mediaValue, authStatus]) => {
            if (!authStatus?.isAuthenticated) {
              this.opened = false;
            } else {
              if (mediaValue[0].mqAlias === 'xs') {
                this.opened = false;
              } else {
                this.opened = true;
              }
            }
          })
        )
        .subscribe()
    );
  }
}
