import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { forkJoin, map } from 'rxjs';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html',
  styleUrls: ['./user-appointment.component.css'],
})
export class UserAppointmentComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserID();
    if (userId) {
      this.appointmentService
        .getAppointments(userId)
        .subscribe((response: any) => {
          const appointmentObservables = response.map((appointment: any) => {
            return this.appointmentService
              .getDoctor(appointment.doctor_id)
              .pipe(
                map((doctor: any) => {
                  appointment.doctor_name = doctor.name;
                  return appointment;
                })
              );
          });

          forkJoin(appointmentObservables).subscribe(
            (appointments: any) => {
              this.appointments = appointments as any[];
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        });
    }
  }

  goBack() {
    this.router.navigate(['/user-home']);
  }
}

export interface Appointment {
  id: number;
  user_id: number;
  doctor_id: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  description: string;
  status: string;
}
