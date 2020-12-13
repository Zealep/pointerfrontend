import { catchError } from 'rxjs/operators';
import { HOST } from './../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/TipoDocumento';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private url: string = `${HOST}/tipoDocumento`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers() {
    return this.http.get<TipoDocumento[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
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
    return throwError('Usuario o clave invalidas');

  }
}
