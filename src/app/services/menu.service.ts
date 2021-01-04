import { Combo } from './../models/dto/combo';
import { ID_EMPRESA } from './../shared/var.constant';
import { RequestCombo } from './../models/dto/request-combo';
import { Menu } from './../models/menu';
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
export class MenuService {

  private url: string = `${HOST}/menu`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getMenus() {
    return this.http.get<Menu[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getGeneros(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = '60'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEstadoCivil(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'ESTADOCIVIL'
    req.dato = ''

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getPais(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'PAIS'
    req.dato = ''

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDepartamento(dato: string){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DEPARTAMENTO'
    req.dato = dato

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getProvincia(dato: string){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'PROVINCIA'
    req.dato = dato

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDistrito(dato: string){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DISTRITO'
    req.dato = dato

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTipoVia(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'TIPOVIA'
    req.dato = ''

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTipoZona(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'TIPOZONA'
    req.dato = ''

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getMotivoEntero(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = 'MI'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCargo(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'CARGO'
    req.dato = ''

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAreas(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'AREA'
    req.dato = ''

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTiposEmpresa(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = 'TE'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTiposActividad(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = '55'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTiposDedicacion(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = 'TD'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTiposModalidad(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = 'TD'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTiposSituacion(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = 'SE'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTiposTiempo(){
    let req = new RequestCombo();
    req.idEmpresa = ID_EMPRESA
    req.table = 'DATO'
    req.dato = '19'

    return this.http.post<Combo[]>(`${this.url}/select`,req)
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
