import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService
      .register({
        username: this.username,
        password: this.password,
        isAdmin: this.isAdmin,
      })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
