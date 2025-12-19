import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  isAdmin$ = this.isAdminSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.checkAuthStatus();
  }

  // Changed from private to public
  checkAuthStatus() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        this.isAdminSubject.next(user.role === 'admin');
        this.isLoggedInSubject.next(!!user.role);
      } catch (error) {
        console.error('Error checking auth status:', error);
        this.isAdminSubject.next(false);
        this.isLoggedInSubject.next(false);
      }
    }
  }

  setAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }

  setLoggedInStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  getStoredUser() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return JSON.parse(sessionStorage.getItem('user') || '{}');
      } catch (error) {
        console.error('Error getting stored user:', error);
        return {};
      }
    }
    return {};
  }

  storeUser(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.checkAuthStatus();
      } catch (error) {
        console.error('Error storing user:', error);
      }
    }
  }

  clearUser() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        sessionStorage.removeItem('user');
        this.isAdminSubject.next(false);
        this.isLoggedInSubject.next(false);
      } catch (error) {
        console.error('Error clearing user:', error);
      }
    }
  }
}