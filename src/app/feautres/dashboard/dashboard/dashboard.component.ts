import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const localUser = JSON.parse(userData);
      const accountNumber = localUser.cardNumber;

      this.authService.getUserByAccountNumber(accountNumber).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load user details');
        }
      });
    }
  }
}
