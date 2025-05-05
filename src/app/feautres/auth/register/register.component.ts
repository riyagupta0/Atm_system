import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  Name: string = '';
  cardNumber: string = '';
  pin: string = '';
  email: string = '';
  contact: string = '';
  dob: string = '';
  initialDeposit: number = 0;
  accountType: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.Name && this.cardNumber && this.pin && this.email && this.contact && this.dob && this.accountType) {
      const newUser = {
        name: this.Name,
        cardNumber: this.cardNumber,
        pin: this.pin,
        email: this.email,
        contact: this.contact,
        dob: this.dob,
        initialDeposit: this.initialDeposit,
        accountType: this.accountType
      };
      this.authService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert("KYC Verified Successfully!");
          localStorage.setItem('atm-user', JSON.stringify(newUser));
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          if (error.status === 400 && error.error) {
            const messages: string[] = [];
            for (const key in error.error) {
              if (error.error.hasOwnProperty(key)) {
                messages.push(error.error[key]);
              }
            }
            this.errorMessage = messages.join('  ');
          } else {
            this.errorMessage = 'Card Number already exists in the system';
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill all the fields correctly.';
    }
  }
}
