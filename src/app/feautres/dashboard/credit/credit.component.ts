import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent {
  amount: number = 0;
  accountNumber: string = ''

  userData : any;

  constructor(private authService: AuthService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem('atm-user') || '{}');
    console.log(this.userData.accountNumber);
  }

  onCredit() {
    if (this.amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (this.userData) {
     
     const data = { 
      accountNumber : this.userData.accountNumber,
      amount : this.amount
      }
      this.authService.creditAmount(data).subscribe({
        next: (updatedUser: any) => {
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
