import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DoctorAuthService } from '../services/doctor-auth.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private doctorAuthService: DoctorAuthService) { }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }
    this.http.post('http://localhost:3000/doctor-login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('doctorToken', response.token);
        localStorage.setItem('doctorRefreshToken', response.refreshToken);
        this.errorMessage = '';
        this.router.navigate(['/doctor-home']);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Login failed';
      }
    });
  }

  onLogout() {
    this.doctorAuthService.logout();
    this.router.navigate(['/doctor-login']);
  }
}
