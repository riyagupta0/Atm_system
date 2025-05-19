import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const localUser = JSON.parse(userData);
      this.user = localUser;
    } else {
      alert('please login with card details!');
      this.router.navigate(['/login'])
    }
  }
}
