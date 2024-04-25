import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDoctorAppointments(doctorId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/${doctorId}`);
  }

  createAppointment(appointment: any) {
    return this.http.post(`${this.apiUrl}/appointments`, appointment);
  }

  getAppointmentDetail(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/appointments/${appointmentId}`);
  }

  acceptAppointment(appointmentId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/appointments/${appointmentId}/accept`, {});
  }

  declineAppointment(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/appointments/${appointmentId}`);
  }

  getUser(userId: string) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getDoctor(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}`);
  }  
}

export interface Appointment {
  id: number;
  user_id: number;
  doctor_id: string;
  start_time: string;
  end_time: string;
  description: string;
  status: string;
}

