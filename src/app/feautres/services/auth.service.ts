import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

export interface User {
  id?: number;
  name: string;
  cardNumber: string;
  pin: string;
  email: string;
  contact: string;
  dob: string;
  initialDeposit: number;
  accountType: string;
}
interface JWTPayload {
  exp: number;
  [key: string]: any; // to allow other claims
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.BASE_URL;

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
    return this.http.put<string>(`${this.baseUrl}/withdraw/${accountNumber}`, null, {
      params: {
        amount: amount.toString(),
        accountType: accountType
      },
      responseType: 'text' as 'json'
    });
  }

  // Change PIN
  changePin(accountNumber: number, newPin: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/changePin/${accountNumber}?newPin=${newPin}`, {});
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

  //helper function to read the expiration time from Token 
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt_decode.jwtDecode<JWTPayload>(token);
      if (!decoded.exp) return true; // No exp field = invalid
      const expiryTime = decoded.exp * 1000;
      return Date.now() > expiryTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return true; // Treat as expired if token can't be decoded
    }
  }

  //login using jwt
  login(credentials: { cardNumber: string, pin: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  //store the jwt token on local storage 
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  //retrieve the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //remove the token from local storage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('atm-user');
  }
}
