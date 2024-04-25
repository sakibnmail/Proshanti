import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Appointment, AppointmentDetailComponent } from './appointment-detail.component';
import { DoctorService } from '../doctor-home/doctor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppointmentDetailComponent', () => {
  let component: AppointmentDetailComponent;
  let fixture: ComponentFixture<AppointmentDetailComponent>;
  let mockDoctorService: jasmine.SpyObj<DoctorService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockDoctorService = jasmine.createSpyObj(['getAppointmentDetail', 'getUser', 'acceptAppointment', 'declineAppointment']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      declarations: [AppointmentDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DoctorService, useValue: mockDoctorService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch appointment detail on init', () => {
    const mockAppointment: Appointment = {
      id: 1,
      user_id: 1,
      doctor_id: '1',
      start_time: '2024-04-21T09:00:00Z',
      end_time: '2024-04-21T10:00:00Z',
      description: 'Test Description',
      status: 'pending'
    };
  
    mockDoctorService.getAppointmentDetail.and.returnValue(of(mockAppointment));
    mockDoctorService.getUser.and.returnValue(of({ name: 'Test User' }));
  
    fixture.detectChanges();
  
    expect(mockDoctorService.getAppointmentDetail).toHaveBeenCalled();
    expect(mockDoctorService.getUser).toHaveBeenCalled();
  });
  

  it('should accept appointment', () => {
    mockDoctorService.acceptAppointment.and.returnValue(of(void 0));
  
    component.onAccept();
  
    expect(mockDoctorService.acceptAppointment).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/doctor-home']);
  });
  
  it('should decline appointment', () => {
    mockDoctorService.declineAppointment.and.returnValue(of(void 0));
  
    component.onDecline();
  
    expect(mockDoctorService.declineAppointment).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/doctor-home']);
  });
  
});
