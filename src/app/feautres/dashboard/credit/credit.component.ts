import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-credit',
  imports: [FormsModule],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
})
export class CreditComponent {
  amount: number = 0;
  cardNumber: string = '';
  userAccount: number = 0;

  constructor(private authService: AuthService, private router: Router) {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userAccount = user.cardNumber;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onCredit() {
    if (this.amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);

      this.authService.creditAmount(this.userAccount, this.amount).subscribe({
        next: (updatedUser: any) => {

          user.initialDeposit += this.amount;
          localStorage.setItem('atm-user', JSON.stringify(user));
          alert('Credit Successful!');
          this.router.navigate(['/dashboard/success'], { queryParams: { message: `₹${this.amount} credited successfully!` } });
        },
        error: (error: any) => {
          // Handle any errors from the API
          console.error(error);
          alert(error.error.message || 'Credit failed. Please try again.');
        }
      });
    }

  }
}
