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
  registerObj = {
    Name:  '',
    cardNumber:  '',
    pin:  '',
    email:  '',
    contact:  '',
    dob:  '',
    initialDeposit: 0,
    accountType:  '',
    
  }
  errorMessage: string = '';
  

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.registerObj.Name && this.registerObj.cardNumber && this.registerObj.pin && this.registerObj.email && this.registerObj.contact && this.registerObj.dob && this.registerObj.accountType) {
      const newUser = {
        name: this.registerObj.Name,
        cardNumber: this.registerObj.cardNumber,
        pin: this.registerObj.pin,
        email: this.registerObj.email,
        contact: this.registerObj.contact,
        dob: this.registerObj.dob,
        initialDeposit: this.registerObj.initialDeposit,
        accountType: this.registerObj.accountType
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
