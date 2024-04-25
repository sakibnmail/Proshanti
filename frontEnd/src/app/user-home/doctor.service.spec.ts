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

  it('should fetch doctors from the API via GET', () => {
    const dummyDoctors = [
      { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', rating: 4.5 },
      { id: 2, name: 'Dr. Johnson', specialty: 'Neurology', rating: 4.7 }
    ];

    service.getDoctors().subscribe(doctors => {
      expect(doctors.length).toBe(2);
    });

    const req = httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDoctors);
  });
});
