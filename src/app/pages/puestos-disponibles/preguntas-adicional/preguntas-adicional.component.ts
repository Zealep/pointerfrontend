import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BandejaRequisicion } from 'src/app/models/dto/bandeja-requisicion';
import { RequisicionPersonal } from 'src/app/models/requisicion-personal';
import { RequisicionPersonalPregunta } from 'src/app/models/requisicion-personal-pregunta';
import { RequisicionPersonalPreguntaService } from '../../../services/requisicion-personal-pregunta.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PostulanteRespuesta } from 'src/app/models/postulante-respuesta';
import { Pregunta } from '../../../models/pregunta';
import { RequisicionPersonalPostulante } from 'src/app/models/requisicion-personal-postulante';
import { RequisicionPersonalService } from 'src/app/services/requisicion-personal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preguntas-adicional',
  templateUrl: './preguntas-adicional.component.html',
  styleUrls: ['./preguntas-adicional.component.css']
})
export class PreguntasAdicionalComponent implements OnInit {

  idRequisicion!: string
  requisicionPersonal!: RequisicionPersonal
  bandejaRequisicion!: BandejaRequisicion
  preguntasRequisicion: RequisicionPersonalPregunta[] = []
  arrayRespuestas!: FormArray


  constructor(public dialogRef: MatDialogRef<PreguntasAdicionalComponent>,
    private requisicionPersonalService: RequisicionPersonalService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BandejaRequisicion,
    private requisicionPersonalPreguntaService: RequisicionPersonalPreguntaService
  ) { }

  ngOnInit() {
    this.idRequisicion = this.data.idRequisicionPersonal!;
    this.bandejaRequisicion = this.data
    console.log(this.data);
    this.getPreguntasByIdRequisicion()
  }

  getPreguntasByIdRequisicion() {
    this.requisicionPersonalPreguntaService.getBydIdRequisicion(this.idRequisicion)
      .subscribe(x => {
        console.log('preguntas', x);
        this.preguntasRequisicion = x
        this.arrayRespuestas = new FormArray(x.map((r: any) => new FormGroup({
          idRequisicionPregunta: new FormControl(r.idRequisicionpersonalPregunta),
          idPregunta: new FormControl(r.pregunta.idPregunta),
          respuesta: new FormControl('')
        })))
      })
  }

  getGroup(index: any) {
    return this.arrayRespuestas.at(index) as FormGroup
  }

  close() {
    this.dialogRef.close()
  }

  save() {

    let respuestas: PostulanteRespuesta[] = []

    this.arrayRespuestas.getRawValue().forEach(x => {

      let post = new PostulanteRespuesta
      let req = new RequisicionPersonalPregunta
      let pregunta = new Pregunta
      pregunta.idPregunta = x.idPregunta
      req.pregunta = pregunta
      req.idRequisicionpersonalPregunta = x.idRequisicionPregunta
      post.requisicionPersonalPregunta = req
      post.idPostulante = sessionStorage.getItem('usuario')
      post.respuesta = x.respuesta
      respuestas.push(post)

    })


    this.requisicionPersonalPreguntaService.saveRespuestas(respuestas)
      .subscribe(x => {

        let reqPos = new RequisicionPersonalPostulante()
        let req = new RequisicionPersonal()
        req.idRequisicionPersonal = this.idRequisicion
        reqPos.requisicionPersonal = req
        reqPos.idPostulante = sessionStorage.getItem('usuario')
        this.requisicionPersonalService.savePostulante(reqPos)
          .subscribe(x => {
            this.snackBar.open('Se inscribio correctamente a la postulación', 'X', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            });
          })
        this.close()

      })


  }

}
