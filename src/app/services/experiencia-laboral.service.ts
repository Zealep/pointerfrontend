import { catchError } from 'rxjs/operators';
import { HOST } from './../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ExperienciaLaboral } from '../models/experiencia-laboral';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  private url: string = `${HOST}/expLaboral`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getExperiencias() {
    return this.http.get<ExperienciaLaboral[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getExperienciasByPostulante(id: string) {
    return this.http.get<ExperienciaLaboral[]>(`${this.url}/findByPostulante/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getExperienciaById(id: string){
    return this.http.get<ExperienciaLaboral>(`${this.url}/find/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  save(x: ExperienciaLaboral){
    return this.http.post<ResponseApi>(`${this.url}/save`,x)
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string){
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
    return throwError('Usuario o clave invalidas');

  }
}
