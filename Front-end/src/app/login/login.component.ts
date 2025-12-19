import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLogin: boolean = true;
  user: any = {
    email: '',
    motpasse: '',
    role: '',
    cin: '',
    firstname: '',
    lastname: ''
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.checkUserRoleAndRedirect(this.user);
    }
  }

  private checkUserRoleAndRedirect(user: any) {
    if (user.role === 'admin') {
      this.authService.setAdminStatus(true);
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.authService.setAdminStatus(false);
      this.router.navigate(['/student-dashboard']);
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.resetForm();
  }

  resetForm() {
    this.user = {
      email: '',
      motpasse: '',
      role: '',
      cin: '',
      firstname: '',
      lastname: ''
    };
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit() {
    const urlEtudiant = "http://localhost:5043/api/Etudiant/login";
    const urlAdmin = "http://localhost:5043/api/Admin/login";
    
    if (this.isLogin) {
      if (this.user.role !== 'admin') {
        const payload = {
          cin: this.user.cin,
          motpasse: this.user.motpasse
        };
        this.http.post(urlEtudiant, payload).subscribe({
          next: (response: any) => {
            this.user = { ...response, role: 'etudiant' };
            this.handleLoginSuccess(this.user);
          },
          error: (error) => {
            this.errorMessage = 'Invalid CIN or password.';
            this.successMessage = '';
          }
        });
      } else {
        const payloadAdmin = {
          email: this.user.email,
          motpasse: this.user.motpasse
        };
        this.http.post(urlAdmin, payloadAdmin).subscribe({
          next: (response: any) => {
            this.user = { ...response, role: 'admin' };
            this.handleLoginSuccess(this.user);
          },
          error: (error) => {
            this.errorMessage = 'Invalid Email or password.';
            this.successMessage = '';
          }
        });
      }
    } else {
      this.handleRegistration();
    }
  }

  private handleLoginSuccess(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn = true;
    this.successMessage = `Welcome back, ${user.firstname}!`;
    this.errorMessage = '';
    this.checkUserRoleAndRedirect(user);
  }

  private handleRegistration() {
    if (this.validateRegistrationFields()) {
      const payload = {
        cin: this.user.cin,
        nom: this.user.firstname,
        prenom: this.user.lastname,
        mail: this.user.email,
        motPasse: this.user.motpasse,
        reservations: []
      };
      
      this.http.post('http://localhost:5043/api/Etudiant', payload).subscribe({
        next: (response: any) => {
          this.successMessage = 'Registration successful! Please login.';
          this.errorMessage = '';
          setTimeout(() => this.toggleForm(), 2000); // Switch to login form after 2 seconds
        },
        error: (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          this.successMessage = '';
          console.error('Registration error:', error);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
    }
  }

  private validateRegistrationFields(): boolean {
    return !!(
      this.user.cin && 
      this.user.firstname && 
      this.user.lastname && 
      this.user.email && 
      this.user.motpasse
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;
    this.authService.setAdminStatus(false);
    this.resetForm();
    this.successMessage = 'You have been logged out.';
    this.router.navigate(['/']);
  }
}