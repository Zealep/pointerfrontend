import { ResponseApi } from './../models/response-api';
import { Usuario } from 'src/app/models/usuario';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HOST, TOKEN_NAME, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD } from './../shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlToken: string = `${HOST}/oauth/token`;
  private url: string = `${HOST}/usuario`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getByCorreo(correo:string){
    return this.http.get<Usuario>(`${this.url}/findByCorreo/${correo}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  getUsers() {
    return this.http.get<Usuario[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  save(x: Usuario){
    return this.http.post<ResponseApi>(`${this.url}/save`,x)
    .pipe(
      catchError(this.handleError)
    );
  }

  sendEmail(correo:string){
    let parms = new HttpParams();
    parms = parms.append('correo',correo);
    return this.http.get<ResponseApi>(`${this.url}/sendEmail`,
    {
      params:parms
    })
  }


  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post(this.urlToken, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Usuario o clave incorrecta');

  }
}

