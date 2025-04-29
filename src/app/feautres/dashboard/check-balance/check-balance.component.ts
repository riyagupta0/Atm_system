import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-balance',
  imports: [],
  templateUrl: './check-balance.component.html',
  styleUrl: './check-balance.component.css'
})
export class CheckBalanceComponent implements OnInit {
  balance: number = 0;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      const userAccount = user.cardNumber;

      // Call the backend to get the balance using the user's ID
      this.authService.checkBalance(userAccount).subscribe({
        next: (balance: number) => {
          this.balance = balance; // Set the balance received from API
        },
        error: (error: any) => {
          console.error(error);
          this.errorMessage = 'Failed to fetch balance. Please try again later.';
        }
      });
    } else {
      alert("Please Login with your card details!")
      this.router.navigate(['/auth/login']);
    }
  }
}
