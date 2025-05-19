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
  accountType: string;
  initialDeposit: number;
  accountNumber: number;
  message: String;
}
interface JWTPayload {
  exp: number;
  [key: string]: any; // to allow other claims
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AuthUrl = environment.AUTH_URL;
  private AtmUrl = environment.ATM_URL;

  constructor(private http: HttpClient) { }

  // API call to create user (Sign Up)
  createUser(userData: any): Observable<User> {
    console.log('Payload sent to backend:', userData);
    return this.http.post<User>(`${this.AuthUrl}/register`, userData);
  }
  //Login with jwt authentication
  login(credentials: { accountNumber: string, pin: string }) {
    console.log('Payload sent to backend:', credentials);
    return this.http.post(`${this.AuthUrl}/login`, credentials);
  }

  // Credit Money
  creditAmount(credentials:  { accountNumber: String,  amount: number }): Observable<User> {
    return this.http.post<User>(`${this.AtmUrl}/deposit`, credentials, {
      responseType: 'json',
    });
  }

  // Withdraw Money
  withdrawAmount(credentials:  { accountNumber: String, pin: String, amount: number }): Observable<any> {
    return this.http.post(`${this.AtmUrl}/withdraw`, credentials, {
      responseType: 'json'
    });
  }

  // Change PIN
  changePin(credentials: {accountNumber: number, currentPin: string,  newPin: string, confirmPin: string}): Observable<User> {
    return this.http.post<User>(`${this.AtmUrl}/change-pin`, 
      credentials
    );
  }

  // Transfer Funds
  transferFunds(credentials: {sourceAccountNumber: string,  sourceCardNumber: string, pin:  string, destinationAccountNumber: string, amount: number}): Observable<User> {
    return this.http.post<User>(`${this.AtmUrl}/transfer`, credentials );
  }

  // Check Balance
  checkBalance(accountNumber: number): Observable<number> {
    return this.http.get<number>(`${this.AtmUrl}/balance/${accountNumber}`);
  }

  // Get last transactions
  getTransactions(userAccount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.AtmUrl}/transactions/${userAccount}`);
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

 
  
  //store the jwt token on local storage 
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  //retrieve the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
  logout(token: string): Observable<any> {
  const headers = {
    Authorization: `Bearer ${token}`
  };
  localStorage.removeItem('atm-user');
  localStorage.removeItem('token');
  return this.http.post(`${this.AtmUrl}/logout`, {}, { headers });
}
}
