import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const authService = inject(AuthService); 

  if (!token) {
    alert('Access denied. Please log in first.');
    router.navigate(['/auth/login']);
    return false;
  }

  // Check if token is expired using the helper function
  if (authService.isTokenExpired(token)) {
    alert('Session expired. Please log in again.');
    localStorage.removeItem('token'); // Remove expired token
    router.navigate(['/auth/login']);
    return false;
  }

  return true; // Token exists and is valid
};