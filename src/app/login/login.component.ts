import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const token = localStorage.getItem('token') || null;
    if (token) {
    }
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
