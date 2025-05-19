import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-transfer-funds',
  imports: [FormsModule, NgIf],
  templateUrl: './transfer-funds.component.html',
  styleUrl: './transfer-funds.component.css'
})
export class TransferFundsComponent {

  sourceAccountNumber: string ='';
  sourceCardNumber: string = '';
  pin: string = '';
  amount: number = 0;
  destinationAccountNumber: string = '';
  senderAccountNumber: number = 0;
  
  errorMessage: string = '';
  successMessage: string = '';

  userData : any = {};

  constructor(private router: Router, private authService: AuthService) {
    this.userData = JSON.parse(localStorage.getItem('atm-user') || '{}');
    
  }

  transferFunds() {
    if (this.amount <= 0 || this.destinationAccountNumber === '') {
      this.errorMessage = 'Please enter a valid amount and receiver card number.';
      return;
    }

    const data = {
      sourceAccountNumber: this.userData?.accountNumber,
      sourceCardNumber: this.userData.cardNumber,
      pin: this.pin,
      destinationAccountNumber: this.destinationAccountNumber,
      amount: this.amount,
    }
   

    this.authService.transferFunds(data).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.router.navigate(['/dashboard/success'], { queryParams: { message: this.successMessage } });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Transfer failed. Please check the card number or try again later.';
      }
    });

  }
}
