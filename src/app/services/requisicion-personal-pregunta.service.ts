import { DatoArchivo } from '../models/dato-archivo';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { RequisicionPersonal } from '../models/requisicion-personal';
import { BandejaRequisicionRequestIn } from '../models/dto/bandeja-requisicion-in';
import { BandejaRequisicion } from '../models/dto/bandeja-requisicion';
import { RequisicionPersonalPregunta } from '../models/requisicion-personal-pregunta';
import { PostulanteRespuesta } from '../models/postulante-respuesta';

@Injectable({
  providedIn: 'root'
})
export class RequisicionPersonalPreguntaService {

  private baseUrl: string = `${HOST}/requisicion-pregunta`;

  constructor(private http: HttpClient, private router: Router) {
  }


  getBydIdRequisicion(id: string) {
    return this.http.get<RequisicionPersonalPregunta[]>(`${this.baseUrl}/idRequisicion/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveRespuestas(respuestas: PostulanteRespuesta[]) {
    return this.http.post<ResponseApi>(`${this.baseUrl}/saveRespuestas`, respuestas)
      .pipe(
        catchError(this.handleError)
      );
  }





  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Ocurrio un error en la peticion');

  }
}
