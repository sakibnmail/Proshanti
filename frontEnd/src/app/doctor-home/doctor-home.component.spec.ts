import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DoctorHomeComponent } from './doctor-home.component';
import { Appointment, DoctorService } from './doctor.service';
import { DoctorAuthService } from '../services/doctor-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DoctorHomeComponent', () => {
  let component: DoctorHomeComponent;
  let fixture: ComponentFixture<DoctorHomeComponent>;
  let mockDoctorService: jasmine.SpyObj<DoctorService>;
  let mockDoctorAuthService: jasmine.SpyObj<DoctorAuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDoctorService = jasmine.createSpyObj(['getDoctor', 'getDoctorAppointments', 'getUser']);
    mockDoctorAuthService = jasmine.createSpyObj(['getDoctorId', 'logout']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    mockDoctorAuthService.getDoctorId.and.returnValue('1');

    await TestBed.configureTestingModule({
      declarations: [DoctorHomeComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        { provide: DoctorService, useValue: mockDoctorService },
        { provide: DoctorAuthService, useValue: mockDoctorAuthService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch doctor and appointments on init', () => {
  //   const mockDoctor = { name: 'Test Doctor' };
  //   const mockAppointment: Appointment = {
  //     id: 1,
  //     user_id: 1,
  //     doctor_id: '1',
  //     start_time: '2024-04-21T09:00:00Z',
  //     end_time: '2024-04-21T10:00:00Z',
  //     description: 'Test Description',
  //     status: 'pending'
  //   };

  //   mockDoctorAuthService.getDoctorId.and.returnValue('1');
  //   mockDoctorService.getDoctor.and.returnValue(of(mockDoctor));
  //   mockDoctorService.getDoctorAppointments.and.returnValue(of([mockAppointment]));
  //   mockDoctorService.getUser.and.returnValue(of({ name: 'Test User' }));

  //   fixture.detectChanges();

  //   // expect(mockDoctorAuthService.getDoctorId).toHaveBeenCalled();
  //   expect(mockDoctorService.getDoctor).toHaveBeenCalled();
  //   expect(mockDoctorService.getDoctorAppointments).toHaveBeenCalled();
  //   expect(mockDoctorService.getUser).toHaveBeenCalled();
  // });

  it('should logout', () => {
    component.onLogout();

    expect(mockDoctorAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
