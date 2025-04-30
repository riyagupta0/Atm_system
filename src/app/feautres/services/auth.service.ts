import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: number;
  Name: string;
  cardNumber: string;
  pin: string;
  email: string;
  contact: string;
  dob: string;
  initialDeposit: number;
  accountType: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.BASE_URL; // your backend URL

  constructor(private http: HttpClient) { }


  // API call to create user (Sign Up)
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  // Get User by Account Number
  getUserByAccountNumber(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${accountNumber}`);
  }

  // Credit Money
  creditAmount(accountNumber: number, amount: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/credit/${accountNumber}?amount=${amount}`, {});
  }

  // Withdraw Money
  withdrawAmount(accountNumber: number, amount: number, accountType: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/withdraw/${accountNumber}?amount=${amount}?accountType=${accountType}`, {});
  }

  // Change PIN
  changePin(accountNumber: number, newPin: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/changepin/${accountNumber}?newPin=${newPin}`, {});
  }

  // Transfer Funds
  transferFunds(senderAccount: number, receiverAccount: number, amount: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/transfer?senderCardNumber=${senderAccount}&receiverCardNumber=${receiverAccount}&amount=${amount}`, {});
  }

  // Check Balance
  checkBalance(accountNumber: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/initialDeposit/${accountNumber}`);
  }

  // Get last transactions
  getTransactions(userAccount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions/all/${userAccount}`);
  }

}
