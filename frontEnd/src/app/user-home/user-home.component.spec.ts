import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { UserHomeComponent } from './user-home.component';
import { DoctorService } from './doctor.service';
import { AuthService } from '../services/auth.service';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let doctorService: DoctorService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserHomeComponent],
      providers: [DoctorService, AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    doctorService = TestBed.inject(DoctorService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get doctors on init', () => {
  //   const doctors = [
  //     { id: '1', name: 'Dr. Smith', specialty: 'Cardiology', rating: 4.5 },
  //     { id: '2', name: 'Dr. Jones', specialty: 'Neurology', rating: 4.7 }
  //   ];
  //   const doctorNames = doctors.map(doctor => doctor.name);
  //   spyOn(doctorService, 'getDoctors').and.returnValue(of(doctorNames));
  //   component.ngOnInit();
  //   expect(component.doctors).toEqual(doctors);
  // });  

  it('should navigate to doctor detail', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToDoctorDetail('1');
    expect(navigateSpy).toHaveBeenCalledWith(['/doctor', '1']);
  });

  it('should navigate to appointments', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToAppointments();
    expect(navigateSpy).toHaveBeenCalledWith(['/user-appointments']);
  });

  it('should logout and navigate to home', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const logoutSpy = spyOn(authService, 'logout');
    component.onLogout();
    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
