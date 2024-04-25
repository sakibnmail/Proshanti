import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';
  name = ''; 
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSignup() {
    if (!this.username || !this.password || !this.name) {
      this.errorMessage = 'Username, password, and name are required';
      return;
    }
    this.http.post('http://localhost:3000/signup', {
      username: this.username,
      password: this.password,
      name: this.name
    }).subscribe({
      next: response => {
        console.log(response);
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Signup failed';
      }
    });
  }
}