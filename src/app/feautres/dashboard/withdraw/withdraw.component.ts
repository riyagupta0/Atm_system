import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-withdraw',
  imports: [FormsModule, NgIf],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent {
  amount: number = 0;
  balance: number = 0;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      this.balance = user.initialDeposit;
    }
  }

  withdrawMoney() {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    if (this.amount > this.balance) {
      this.errorMessage = 'Insufficient balance!';
      return;
    }

    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      const userAccount = user.cardNumber;
      this.authService.withdrawAmount(userAccount, this.amount).subscribe({
        next: (message: string) => {

          user.initialDeposit -= this.amount;
          localStorage.setItem('atm-user', JSON.stringify(user));

          this.router.navigate(['/dashboard/success'], { queryParams: { message: `₹${this.amount} withdrawn successfully!` } });
        },
        error: (error: any) => {
          // Handle any errors from the API
          console.error(error);
          this.errorMessage = error.error.message || 'Withdrawal failed. Please try again.';
        }
      });
    }
  }



}
