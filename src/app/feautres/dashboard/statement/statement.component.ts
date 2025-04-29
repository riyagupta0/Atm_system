import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-statement',
  imports: [NgIf, NgFor],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent {
  transactions: any[] = [];
  accountNumber: number = 0;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userData = localStorage.getItem('atm-user');
    if (userData) {
      const user = JSON.parse(userData);
      this.accountNumber = user.cardNumber; // fetch user id from localstorage
      this.loadTransactions();
    }
  }
  loadTransactions() {
    this.authService.getTransactions(this.accountNumber).subscribe({
      next: (data: any[]) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to fetch transactions.');
      }
    });
  }

  download() {
    let receipt = 'Type\tAmount\tDate\n';
    this.transactions.forEach(t => {
      receipt += `${t.type}\t₹${t.amount}\t${new Date(t.date).toLocaleString()}\n`;
    });

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
