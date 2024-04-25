import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [LoginComponent],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail login when username or password is not provided', () => {
    component.username = '';
    component.password = '';
    component.onLogin();
    expect(component.errorMessage).toEqual('Username and password are required');
  });

  it('should call http.post on successful login', () => {
    const http = TestBed.inject(HttpClient);
    const spy = spyOn(http, 'post').and.returnValue(of({ token: 'testtoken' }));
    component.username = 'testuser';
    component.password = 'testpass';
    component.onLogin();
    expect(spy).toHaveBeenCalled();
  });

  it('should set errorMessage on failed login', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.returnValue(throwError('Login failed'));
    component.username = 'testuser';
    component.password = 'testpass';
    component.onLogin();
    expect(component.errorMessage).toEqual('Login failed');
  });

  it('should call authService.logout on logout', () => {
    const authService = TestBed.inject(AuthService);
    const spy = spyOn(authService, 'logout');
    component.onLogout();
    expect(spy).toHaveBeenCalled();
  });
});
