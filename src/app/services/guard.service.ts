import { UsuarioService } from './usuario.service';
import { TOKEN_NAME } from './../shared/var.constant';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TimeoutError } from 'rxjs';
//import * as decode from 'jwt-decode';


@Injectable()
export class GuardService implements CanActivate {

  constructor(private loginService: UsuarioService, private router: Router
 ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
    ) {
    const helper = new JwtHelperService ();
    let rpta = this.loginService.estaLogeado();
    if (!rpta) {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
    } else {
        let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));

        if (helper.isTokenExpired(token.access_token)) {
            sessionStorage.clear();
            this.router.navigate(['login']);
            return false;
        }
        else{
            return true;
        }

    }
}

}
