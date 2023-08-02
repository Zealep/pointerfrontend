import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn() && this.checkTokenExpiration())
      return true;

    this.router.navigate(['login']);
    return false;

  }

  checkTokenExpiration(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const tokenExp = new Date(Number.parseInt(JSON.parse(atob(token.split('.')[1])).exp) * 1000);
      const now = new Date();
      return tokenExp > now;
    }
    return false;
  }

}
