import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorAuthService } from '../services/doctor-auth.service';
import { DoctorService } from './doctor.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css'],
})
export class DoctorHomeComponent {
  doctorId: string | null = '';
  doctorName: string | null = '';
  pendingAppointments: Appointment[] = [];
  acceptedAppointments: Appointment[] = [];

  constructor(
    private router: Router,
    private doctorAuthService: DoctorAuthService,
    private doctorService: DoctorService
  ) {
    this.doctorId = this.doctorAuthService.getDoctorId();
  }

  ngOnInit() {
    if (this.doctorId) {
      this.doctorService.getDoctor(this.doctorId).subscribe((response: any) => {
        this.doctorName = response.name;

        if (this.doctorId) {
          this.doctorService
            .getDoctorAppointments(this.doctorId)
            .subscribe((response: any) => {
              const appointmentObservables = response.map(
                (appointment: any) => {
                  return this.doctorService.getUser(appointment.user_id).pipe(
                    map((user: any) => {
                      appointment.user_name = user.name;
                      return appointment;
                    })
                  );
                }
              );

              forkJoin(appointmentObservables).subscribe(
                (appointments: any) => {
                  this.pendingAppointments = appointments.filter(
                    (appointment: any) => appointment.status === 'pending'
                  );
                  this.acceptedAppointments = appointments.filter(
                    (appointment: any) => appointment.status === 'accepted'
                  );
                },
                (error) => {
                  console.error('Error:', error);
                }
              );
            });
        }
      });
    } else {
      console.error('Doctor ID is null');
    }
  }

  onLogout() {
    this.doctorAuthService.logout();
    this.router.navigate(['/']);
  }
}

export interface Appointment {
  id: number;
  user_id: number;
  doctor_id: string;
  user_name: string;
  start_time: string;
  end_time: string;
  description: string;
  status: string;
}
