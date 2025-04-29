import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('atm-user'); // Remove the user from local storage
    this.router.navigate(['/auth/login']); // Navigate to login page
  }
}
