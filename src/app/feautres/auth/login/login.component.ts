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
    this.authService.getUserByAccountNumber(this.cardNumber).subscribe({
      next: (user: User) => {
        if (user.pin === this.pin) {
          // Save user data in local storage if needed
          localStorage.setItem('atm-user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid card number or PIN.';
        }
      },
      error: () => {
        this.errorMessage = 'User not found. Please check the card number.';
      }
    });
  }
}
