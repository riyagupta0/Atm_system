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
  ConfirmnewPin: string = '';
  accountNumber: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onChangePin(): void {
    if (!this.oldPin || !this.newPin) {
      this.errorMessage = 'Please fill both fields.';
      return;
    }
    const userData = JSON.parse(localStorage.getItem('atm-user')|| '{}');
    if (userData) {
     
      const data = {
        accountNumber : userData.accountNumber,
        currentPin: this.oldPin,
        newPin: this.newPin,
        confirmPin : this.ConfirmnewPin
      }
        
        this.authService.changePin(data).subscribe({
          next: (response: any) => {
            alert('PIN changed successfully!');
            console.log(response);
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
