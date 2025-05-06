import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-pin',
  imports: [FormsModule, NgIf],
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

      if (this.oldPin !== user.pin) {
        this.errorMessage = " Incorrect old Pin";
      }
      else if (this.oldPin === this.newPin) {
        this.errorMessage = "The new pin must be different from your old pin."
      }
      else {
        const userAccount = user.cardNumber;
        this.authService.changePin(userAccount, this.newPin).subscribe({
          next: (response: any) => {
            user.pin = this.newPin;
            localStorage.setItem('atm-user', JSON.stringify(user));
            alert('PIN changed successfully!');
            this.router.navigate(['/dashboard']);
          },
          error: (error: any) => {
            console.error(error);
            this.errorMessage = error.error.pin || 'Failed to change PIN. Please try again.';
          }
        });
      }


    }
  }
}
