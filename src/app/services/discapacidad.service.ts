import { DiscapacidadDTO } from './../models/dto/discapacidad-dto';
import { Discapacidad } from './../models/discapacidad';
import { ResponseApi } from '../models/response-api';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AreaInteres } from '../models/area-interes';

@Injectable({
  providedIn: 'root'
})
export class DiscapacidadService {

  private url: string = `${HOST}/discapacidad`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getDiscapacidades(id:String) {
    return this.http.get<Discapacidad[]>(`${this.url}/findByPostulante/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDiscapacidadesDTOByPostulante(id: string) {
    return this.http.get<DiscapacidadDTO[]>(`${this.url}/getDetailsByPostulante/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }


  save(a : Discapacidad) {
    return this.http.post<ResponseApi>(`${this.url}/save`,a)
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(id:string) {
    return this.http.delete<ResponseApi>(`${this.url}/delete/${id}`)
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
