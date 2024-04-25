import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DoctorAuthService } from './doctor-auth.service';

describe('DoctorAuthService', () => {
  let service: DoctorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorAuthService]
    });
    service = TestBed.inject(DoctorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if token is expired', async () => {
    const token = await service.jwtHelper.tokenGetter();
    if (token) {
      const isExpired = service.isTokenExpired(token);
      expect(isExpired).toBe(true);
    }
  });

  it('should get doctor id', () => {
    const dummyId = '123';
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.4e9B72bP9xuRktxX9xO4I8f3aY9S1ZwFILmYPBhMS0I';
    localStorage.setItem('doctorToken', dummyToken);
  
    const id = service.getDoctorId();
    expect(id).toEqual(dummyId);
  });
  
});
