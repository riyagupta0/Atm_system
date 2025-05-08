import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cardNumber: string = '';
  pin: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.router.navigate(['/auth/register']);
  }
  login() {
    this.authService.login({ cardNumber: this.cardNumber, pin: this.pin }).subscribe({
      next: (res: any) => {
        if (res && res.token) {
          localStorage.setItem('atm-user', JSON.stringify(res.user));
          this.authService.storeToken(res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid response from server.';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid card number or PIN.';
      }
    });
  }
}
