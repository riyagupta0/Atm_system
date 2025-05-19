import { NgIf } from '@angular/common';
import { AuthService } from './../../../feautres/services/auth.service';
import { Component, OnInit , AfterContentChecked } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterContentChecked  {
  isLoggedIn: boolean = false;
  user :any = [];

  constructor(private router: Router, private AuthService: AuthService) { 
    
  }
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  ngAfterContentChecked(): void {
    this.checkLoginStatus(); // continuously check if user is logged in (e.g., after login)
  }

  checkLoginStatus() {
    const storedUser = localStorage.getItem('atm-user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.isLoggedIn = !!this.user?.token;
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.AuthService.logout(this.user.token)// Remove the user from local storage
    alert("Logout Success!")
    this.router.navigate(['/api/auth/login']);
    this.isLoggedIn = false; // Navigate to login page
  }
}
