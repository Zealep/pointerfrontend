import { Idioma } from './../models/idioma';
import { EstudioFormal } from '../models/estudio-formal';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  private url: string = `${HOST}/idiomas`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getIdiomas() {
    return this.http.get<Idioma[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getIdiomasByPostulante(id: string) {
    return this.http.get<Idioma[]>(`${this.url}/findByPostulante/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getIdiomaById(id: string){
    return this.http.get<Idioma>(`${this.url}/find/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  save(x: Idioma){
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
