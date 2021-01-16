import { CarreraDTO } from './../models/dto/carrera-dto';
import { InstitucionDTO } from './../models/dto/institucion-dto';
import { Datos } from './../models/datos';
import { Combo } from '../models/dto/combo';
import { ID_EMPRESA } from '../shared/var.constant';
import { RequestCombo } from '../models/dto/request-combo';
import { Menu } from '../models/menu';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/TipoDocumento';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private url: string = `${HOST}/datos`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getGradoIntruccion() {
    return this.http.get<Datos[]>(`${this.url}/gradoInstruccion`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getInstituciones() {
    return this.http.get<InstitucionDTO[]>(`${this.url}/institucion`)
    .pipe(
      catchError(this.handleError)
    );
  }


  getCarreras(id:string) {
    return this.http.get<CarreraDTO[]>(`${this.url}/carreras/${id}`)
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
