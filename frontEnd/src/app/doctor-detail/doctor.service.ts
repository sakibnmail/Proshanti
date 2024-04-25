// doctor.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  createAppointment(appointment: any) {
    return this.http.post(`${this.apiUrl}/appointments`, appointment).pipe(
      catchError(err => {
        console.error('Raw error:', err);
        return throwError(err);
      })
    );
  }

  getDoctor(id: string) {
    return this.http.get(`${this.apiUrl}/doctor/${id}`);
  }
}
