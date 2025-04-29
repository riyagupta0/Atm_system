import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  dashboard() {
    // const user = localStorage.getItem('atm-user');
    // if (!user) {
    //   alert("Please Login using your card details!");
    //   this.router.navigate(['/auth/login']);
    // }
    this.router.navigate(['/dashboard']);
  }
  logout() {
    localStorage.removeItem('atm-user'); // Remove the user from local storage
    this.router.navigate(['/auth/login']); // Navigate to login page
  }
}
