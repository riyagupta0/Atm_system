import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  accountNumber : string = '';
  amount: number = 0;
  pin : number = 0;

  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
    const userData = localStorage.getItem('atm-user');
    if (!userData) {
      alert("Please Login with your card details!")
      this.router.navigate(['/login']); 
    } 
  }

  withdrawMoney() {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      const data = { 
      accountNumber : user.accountNumber,
      pin: this.pin.toString(),
      amount : this.amount
      }
      this.authService.withdrawAmount(data).subscribe({
        next: (message: string) => {
          console.log(message);
          this.router.navigate(['/dashboard/success'], { queryParams: { message: `₹${this.amount} withdrawn successfully!` } });
        },
        error: (error: any) => {
          // Handle any errors from the API
          console.error(error);
          this.errorMessage = (error && error.error && error.error.message) ? error.error.message : 'Withdrawal failed. Please try again.';
        }
      });
    }
  }
}
