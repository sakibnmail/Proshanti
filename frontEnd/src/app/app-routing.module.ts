import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorAuthGuard } from './guards/doctor-auth.guard';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { UserAppointmentComponent } from './user-appointment/user-appointment.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: 'user-appointments', component: UserAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'doctor-home', component: DoctorHomeComponent, canActivate: [DoctorAuthGuard] },
  { path: 'appointment-detail/:id', component: AppointmentDetailComponent, canActivate: [DoctorAuthGuard] },
  { path: 'doctor-login', component: DoctorLoginComponent },
  { path: 'doctor/:id', component: DoctorDetailComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
