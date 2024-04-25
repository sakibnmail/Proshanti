// doctor-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from './doctor.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
  doctor!: Doctor;
  selectedDate: Date | null = null; 

  timeSlots = ['9:00AM-9:30AM', '9:30AM-10:00AM', '10:00AM-10:30AM', '10:30AM-11:00AM', '11:00AM-11:30AM', '11:30AM-12:00PM', '12:00PM-12:30PM', '12:30PM-1:00PM', '1:00PM-1:30PM', '1:30PM-2:00PM', '2:00PM-2:30PM', '2:30PM-3:00PM'];

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorService.getDoctor(id).subscribe((response: any) => {
        this.doctor = {
          id: response.id,
          username: response.username,
          password: response.password,
          name: response.name,
          specialty: response.specialty,
          area_of_focus: response.area_of_focus,
          board_certified: response.board_certified,
          rating: Number(response.rating),
          languages_spoken: JSON.parse(response.languages_spoken),
          education: response.education,
          license: response.license,
          treatment_approach: response.treatment_approach,
          experience_years: response.experience_years,
          imagePath: response.imagePath,
        };
      }, error => {
        console.error('Error:', error);
      });
    } else {

    }
  }
  
  goBack() {
    this.router.navigate(['/user-home']);
  }

  onSubmit(form: NgForm) {
    const appointment = {
      userId: this.authService.getUserID(),
      doctorId: this.doctor.id,
      startTime: `${form.value.date} ${form.value.timeSlot.split('-')[0]}`, 
      endTime: `${form.value.date} ${form.value.timeSlot.split('-')[1]}`,
      description: form.value.description
    };
    this.doctorService.createAppointment(appointment).subscribe(response => {
      console.log('Appointment created successfully');
      form.reset();
      this.router.navigate(['/user-home']);
    }, error => {
      console.error('Error:', error);
    });
  }
}

interface Doctor {
  id: string;
  username: string;
  password: string;
  name: string;
  specialty: string;
  area_of_focus: string;
  board_certified: string;
  rating: number;
  languages_spoken: string[];
  education: string;
  license: string;
  treatment_approach: string;
  experience_years: number;
  imagePath: string;
}
