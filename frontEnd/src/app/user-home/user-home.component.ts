import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.doctorService.getDoctors().subscribe((response: any) => {
      this.doctors = response.map((doctor: any) => {
        return {
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          rating: Number(doctor.rating)
        };
      });
    }, error => {
      console.error('Error:', error);
    });
  }

  goToDoctorDetail(id: string) {
    this.router.navigate(['/doctor', id]);
  }
  
  goToAppointments() {
    this.router.navigate(['/user-appointments']);
  }  

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
}
