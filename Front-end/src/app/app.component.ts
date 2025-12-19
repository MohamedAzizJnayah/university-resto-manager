import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isAdmin$ = this.authService.isAdmin$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.checkAuthStatus(); // Now this will work
  }

  logout() {
    this.authService.clearUser();
    this.router.navigate(['/']);
  }
}