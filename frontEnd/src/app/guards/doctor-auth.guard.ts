import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DoctorAuthService } from '../services/doctor-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthGuard implements CanActivate {

  constructor(private router: Router, private doctorAuthService: DoctorAuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('doctorToken');

    if (!token || this.doctorAuthService.isTokenExpired(token)) {
      this.router.navigate(['/doctor-login']);
      return false;
    }

    return true;
  }
  
}
