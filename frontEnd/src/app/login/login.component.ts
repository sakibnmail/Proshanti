import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }
    this.http.post('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.errorMessage = '';
        this.router.navigate(['/user-home']);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Login failed';
      }
    });
  }

  onLogout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
