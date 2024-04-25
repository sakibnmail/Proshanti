import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorDetailComponent } from './doctor-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DoctorService } from './doctor.service';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';

describe('DoctorDetailComponent', () => {
  let component: DoctorDetailComponent;
  let fixture: ComponentFixture<DoctorDetailComponent>;
  let doctorService: DoctorService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [DoctorDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        DoctorService,
        AuthService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDetailComponent);
    component = fixture.componentInstance;
    doctorService = TestBed.inject(DoctorService);
    authService = TestBed.inject(AuthService);

    spyOn(doctorService, 'getDoctor').and.returnValue(of({
      id: '1',
      username: 'test',
      password: 'test',
      name: 'test',
      specialty: 'test',
      area_of_focus: 'test',
      board_certified: 'test',
      rating: 5,
      languages_spoken: JSON.stringify(['English']),
      education: 'test',
      license: 'test',
      treatment_approach: 'test',
      experience_years: 10,
      imagePath: 'test'
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get doctor details on init', () => {
    component.ngOnInit();
    expect(doctorService.getDoctor).toHaveBeenCalled();
  });  

  it('should create an appointment on form submit', () => {
    const appointmentSpy = spyOn(doctorService, 'createAppointment').and.returnValue(of({}));
    const authSpy = spyOn(authService, 'getUserID').and.returnValue('1');
    
    const mockForm = {
      value: {
        date: '2024-04-21',
        timeSlot: '9:00AM-9:30AM',
        description: 'Test'
      },
      reset: () => null
    };
    
    component.ngOnInit();
    component.onSubmit(mockForm as unknown as NgForm);
    
    expect(appointmentSpy).toHaveBeenCalled();
    expect(authSpy).toHaveBeenCalled();
  });
      
});
