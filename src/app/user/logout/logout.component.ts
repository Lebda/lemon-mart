import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  public constructor(private router: Router, private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.logout(true);
    this.router.navigate(['/']);
  }
}
