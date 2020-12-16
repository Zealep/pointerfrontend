import { ResponseApi } from './../models/response-api';
import { Menu } from './../models/menu';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/TipoDocumento';
import { throwError } from 'rxjs';
import { DatosPersonal } from '../models/datos-personal';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalService {

  private url: string = `${HOST}/datos-personal`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getDatos() {
    return this.http.get<DatosPersonal[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDatosByIdUserWeb(id: string){
    return this.http.get<DatosPersonal>(`${this.url}/findByUserWeb/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  save(x: DatosPersonal) {
    return this.http.post<ResponseApi>(`${this.url}/save`,x)
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
    return throwError(error.error.message);

  }
}
