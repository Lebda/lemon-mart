import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AuthService, IAuthStatus } from './auth/auth.service';
import { IUser } from './user/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public authStatus$: Observable<IAuthStatus>;
  public user$: Observable<IUser>;

  public constructor(
    private readonly authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
    this.authStatus$ = this.authService.authStatus$;
    this.user$ = this.authService.currentUser$;
  }
}
