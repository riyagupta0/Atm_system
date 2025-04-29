import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-change-pin',
  imports: [FormsModule],
  templateUrl: './change-pin.component.html',
  styleUrl: './change-pin.component.css'
})
export class ChangePinComponent {
  oldPin: string = '';
  newPin: string = '';
  cardNumber: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onChangePin(): void {
    if (!this.oldPin || !this.newPin) {
      this.errorMessage = 'Please fill both fields.';
      return;
    }

    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      const userAccount = user.cardNumber; // Get user ID from local storage

      // Call backend service to change PIN
      this.authService.changePin(userAccount, this.newPin).subscribe({
        next: (response: any) => {
          user.pin = this.newPin;
          alert('PIN changed successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error(error);
          this.errorMessage = error.error.message || 'Failed to change PIN. Please try again.';
        }
      });
    }
  }
}
