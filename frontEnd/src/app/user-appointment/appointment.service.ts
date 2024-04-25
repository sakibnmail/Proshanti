import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAppointments(userId: string) {
    return this.http.get(`${this.apiUrl}/appointments/user/${userId}`);
  }

  getDoctor(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}`);
  }
}

