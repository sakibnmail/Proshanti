// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AuthService } from './auth.service';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { of } from 'rxjs';

// describe('AuthService', () => {
//   let service: AuthService;
//   let httpMock: HttpTestingController;
//   let jwtHelper: JwtHelperService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [AuthService, JwtHelperService]
//     });

//     service = TestBed.inject(AuthService);
//     httpMock = TestBed.inject(HttpTestingController);
//     jwtHelper = TestBed.inject(JwtHelperService);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should refresh token', () => {
//     const dummyToken = 'dummyRefreshToken';
//     localStorage.setItem('refreshToken', dummyToken);

//     service.refreshToken().subscribe();

//     const req = httpMock.expectOne('/api/refresh');
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual({ token: dummyToken });
//   });

//   it('should logout', () => {
//     localStorage.setItem('token', 'dummyToken');
//     localStorage.setItem('refreshToken', 'dummyRefreshToken');

//     service.logout();

//     expect(localStorage.getItem('token')).toBeNull();
//     expect(localStorage.getItem('refreshToken')).toBeNull();
//   });

//   it('should check if token is expired', async () => {
//     spyOn(jwtHelper, 'isTokenExpired').and.returnValue(Promise.resolve(true));
//     expect(await service.isTokenExpired('dummyToken')).toBeTrue();
//   });
  

//   it('should get user ID', () => {
//     const dummyId = '123';
//     spyOn(jwtHelper, 'decodeToken').and.returnValue({ id: dummyId });
//     localStorage.setItem('token', 'dummyToken');

//     expect(service.getUserID()).toEqual(dummyId);
//   });
// });
