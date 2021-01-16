import { EstudioFormalDTO } from './../models/dto/formal-dto';
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
export class EstudioFormalService {

  private url: string = `${HOST}/edu-formal`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getEstudiosFormal() {
    return this.http.get<EstudioFormal[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEstudiosFormalByPostulante(id: string) {
    return this.http.get<EstudioFormal[]>(`${this.url}/findByPostulante/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getFormalesDTOByPostulante(id: string) {
    return this.http.get<EstudioFormalDTO[]>(`${this.url}/getDetailsByPostulante/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEstudioFormalById(id: string){
    return this.http.get<EstudioFormal>(`${this.url}/find/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  save(x: EstudioFormal){
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
