import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DoctorLoginComponent } from './doctor-login.component';
import { DoctorAuthService } from '../services/doctor-auth.service';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('DoctorLoginComponent', () => {
  let component: DoctorLoginComponent;
  let fixture: ComponentFixture<DoctorLoginComponent>;
  let authService: DoctorAuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [DoctorLoginComponent],
      providers: [
        DoctorAuthService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorLoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(DoctorAuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    const response = {
      token: '123',
      refreshToken: '456'
    };
    httpClientSpy.post.and.returnValue(of(response));
    component.username = 'test';
    component.password = 'test';
    component.onLogin();
    expect(localStorage.getItem('doctorToken')).toEqual('123');
    expect(localStorage.getItem('doctorRefreshToken')).toEqual('456');
    expect(component.errorMessage).toEqual('');
  });

  it('should fail to login', () => {
    httpClientSpy.post.and.returnValue(throwError({ status: 400 }));
    component.username = 'test';
    component.password = 'test';
    component.onLogin();
    expect(component.errorMessage).toEqual('Login failed');
  });

  it('should logout successfully', () => {
    spyOn(authService, 'logout');
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
