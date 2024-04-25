import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoctorService, Appointment } from './doctor.service';

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
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch appointments of a doctor', () => {
    const dummyAppointments: Appointment[] = [
      { id: 1, user_id: 1, doctor_id: 'doc1', start_time: '10:00', end_time: '11:00', description: 'Checkup', status: 'pending' },
      { id: 2, user_id: 2, doctor_id: 'doc1', start_time: '11:00', end_time: '12:00', description: 'Follow-up', status: 'accepted' }
    ];

    service.getDoctorAppointments('doc1').subscribe(appointments => {
      expect(appointments.length).toBe(2);
      expect(appointments).toEqual(dummyAppointments);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/appointments/doctor/doc1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAppointments);
  });
});
