// user-appointment.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserAppointmentComponent } from './user-appointment.component';
import { AppointmentService } from './appointment.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('UserAppointmentComponent', () => {
  let component: UserAppointmentComponent;
  let fixture: ComponentFixture<UserAppointmentComponent>;
  let mockAppointmentService: jasmine.SpyObj<AppointmentService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAppointmentService = jasmine.createSpyObj(['getAppointments', 'getDoctor']);
    mockAuthService = jasmine.createSpyObj(['getUserID']);

    TestBed.configureTestingModule({
      declarations: [UserAppointmentComponent],
      providers: [
        { provide: AppointmentService, useValue: mockAppointmentService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(UserAppointmentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get appointments on init', () => {
    mockAuthService.getUserID.and.returnValue('1');
    mockAppointmentService.getAppointments.and.returnValue(of([]));
    mockAppointmentService.getDoctor.and.returnValue(of({ name: 'Doctor' }));

    component.ngOnInit();

    expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith('1');
  });
});