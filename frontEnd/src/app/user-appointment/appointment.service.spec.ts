// appointment.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppointmentService],
    });

    service = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get appointments', () => {
    service.getAppointments('1').subscribe();

    const req = httpMock.expectOne('http://localhost:3000/appointments/user/1');
    expect(req.request.method).toBe('GET');
  });

  it('should get doctor', () => {
    service.getDoctor('1').subscribe();

    const req = httpMock.expectOne('http://localhost:3000/doctor/1');
    expect(req.request.method).toBe('GET');
  });
});