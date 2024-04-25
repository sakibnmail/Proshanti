import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [SignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail signup when username, password or name is not provided', () => {
    component.username = '';
    component.password = '';
    component.name = '';
    component.onSignup();
    expect(component.errorMessage).toEqual('Username, password, and name are required');
  });

  it('should call http.post on successful signup', () => {
    const http = TestBed.inject(HttpClient);
    const spy = spyOn(http, 'post').and.returnValue(of({}));
    component.username = 'testuser';
    component.password = 'testpass';
    component.name = 'testname';
    component.onSignup();
    expect(spy).toHaveBeenCalled();
  });

  it('should set errorMessage on failed signup', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.returnValue(throwError('Signup failed'));
    component.username = 'testuser';
    component.password = 'testpass';
    component.name = 'testname';
    component.onSignup();
    expect(component.errorMessage).toEqual('Signup failed');
  });
});
