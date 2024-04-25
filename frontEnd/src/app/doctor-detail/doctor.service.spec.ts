import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorService]
    });

    service = TestBed.inject(DoctorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve doctors from API via GET', () => {
    const dummyDoctors = [{ id: 1, name: 'Doctor 1' }, { id: 2, name: 'Doctor 2' }];

    service.getDoctors().subscribe(doctors => {
      expect(doctors).toEqual(dummyDoctors);
    });

    const request = httpMock.expectOne(`http://localhost:3000/doctors`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDoctors);
  });

  it('should create an appointment via POST', () => {
    const dummyAppointment = { doctorId: 1, patientId: 2, date: '2024-04-22' };

    service.createAppointment(dummyAppointment).subscribe(appointment => {
      expect(appointment).toEqual(dummyAppointment);
    });

    const request = httpMock.expectOne(`http://localhost:3000/appointments`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyAppointment);
  });

  it('should retrieve a doctor by ID from API via GET', () => {
    const dummyDoctor = { id: 1, name: 'Doctor 1' };

    service.getDoctor('1').subscribe(doctor => {
      expect(doctor).toEqual(dummyDoctor);
    });

    const request = httpMock.expectOne(`http://localhost:3000/doctor/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDoctor);
  });
});
