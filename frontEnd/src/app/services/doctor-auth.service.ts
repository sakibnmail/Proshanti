import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthService {
  jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient) { }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('doctorRefreshToken');
    return this.http.post('/api/doctor-refresh', { token: refreshToken });
  }

  logout() {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorRefreshToken');
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getDoctorId(): string | null {
    const token = localStorage.getItem('doctorToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.id; 
    }
    return null;
  }
  
}
