import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-check-balance',
  imports: [],
  templateUrl: './check-balance.component.html',
  styleUrl: './check-balance.component.css'
})
export class CheckBalanceComponent implements OnInit {
  balance: number = 0;
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      const userAccount = user.cardNumber; // Fetch user ID from local storage

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
      this.errorMessage = 'User not found. Please log in again.';
    }
  }
}
