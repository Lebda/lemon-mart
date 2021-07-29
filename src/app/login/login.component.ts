import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  // public loginForm: FormGroup;
  public loginError = '';
  // public redirectUrl: string;
  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    // this.subs.push(
    //   route.paramMap.subscribe(
    //     (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    //   )
    // );
  }

  public ngOnInit(): void {}
}
