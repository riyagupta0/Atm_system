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
    name:  '',
    cardNumber:  '',
    pin:  '',
    email:  '',
    contact:  '',
    dateOfBirth:  '',
   accountType: '',
    balance: 0
    
  }
  errorMessage: string = '';
  

  constructor(private authService: AuthService, private router: Router) { }
  register() {
    
      const newUser = {
        name: this.registerObj.name,
        cardNumber: this.registerObj.cardNumber,
        pin: this.registerObj.pin,
        email: this.registerObj.email,
        contact: this.registerObj.contact,
        dob: this.registerObj.dateOfBirth,
        initialDeposit: this.registerObj.balance,
        accountType: this.registerObj.accountType,        
      };
      this.authService.createUser(newUser).subscribe({
        next: (response) => {
          const accountNumber = response?.accountNumber;
          const message = response?.message || 'Registered successfully!';
          console.log('User registered successfully:', response);
          
          if (accountNumber) {
            alert(`${message} Your Account Number is ${accountNumber}`);
            this.router.navigate(['/login']);
          } else {
            alert('Registration successful, but no account number received.');
          }
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
   
  }
}
