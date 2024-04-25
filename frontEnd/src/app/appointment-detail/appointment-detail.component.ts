import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor-home/doctor.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  appointmentId: number | null;
  appointment: Appointment = {} as Appointment;

  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.appointmentId = id ? +id : null;
  }

  ngOnInit() {
    if (this.appointmentId !== null) {
      this.doctorService.getAppointmentDetail(this.appointmentId).subscribe((appointment: Appointment) => {
        this.doctorService.getUser(String(appointment.user_id)).subscribe((user: any) => {
          appointment.user_name = user.name;
          this.appointment = appointment;
        });
      });
    }
  }
  
  onAccept() {
    if (this.appointmentId !== null) {
      this.doctorService.acceptAppointment(this.appointmentId).subscribe(() => {
        this.appointment.status = 'Accepted';
        this.router.navigate(['/doctor-home']); 
      });
    }
  }
  
  onDecline() {
    if (this.appointmentId !== null) {
      this.doctorService.declineAppointment(this.appointmentId).subscribe(() => {
        this.router.navigate(['/doctor-home']);
      });
    }
  }
  
  onGoBack() {
    this.router.navigate(['/doctor-home']); 
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
  user_name?: string;
}
