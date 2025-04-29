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

  amount: number = 0;
  receiverAccount: string = '';
  senderAccount: number = 0;
  senderBalance: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      this.senderAccount = user.cardNumber;
      this.senderBalance = user.initialDeposit;
    }
  }

  transferFunds() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.amount <= 0 || this.receiverAccount === '') {
      this.errorMessage = 'Please enter a valid amount and receiver card number.';
      return;
    }

    if (this.amount > this.senderBalance) {
      this.errorMessage = 'Insufficient balance!';
      return;
    }




    const receiverAccount = parseInt(this.receiverAccount);

    this.authService.transferFunds(this.senderAccount, receiverAccount, this.amount).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('atm-user', JSON.stringify(updatedUser)); // update local data
        this.successMessage = `₹${this.amount} transferred successfully to card ${this.receiverAccount}`;
        this.router.navigate(['/dashboard/success'], { queryParams: { message: this.successMessage } });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Transfer failed. Please check the card number or try again later.';
      }
    });

  }
}
