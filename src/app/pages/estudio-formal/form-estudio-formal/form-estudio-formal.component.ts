import { catchError } from 'rxjs/operators';
import { DatosPersonalService } from './../../../services/datos-personal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from './../../../services/menu.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Combo } from './../../../models/dto/combo';
import { Component, OnInit } from '@angular/core';
import { EstudioFormalService } from 'src/app/services/estudio-formal.service';
import { EMPTY } from 'rxjs';
import { EstudioFormal } from 'src/app/models/estudio-formal';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-form-estudio-formal',
  templateUrl: './form-estudio-formal.component.html',
  styleUrls: ['./form-estudio-formal.component.css']
})
export class FormEstudioFormalComponent implements OnInit {

  tiposModalidad: Combo[] = []
  tiposEstudio: Combo[] = []
  tiposTiempo: Combo[] = []
  tiposCentro: Combo[] = [];
  tiposSituacion: Combo[] = [];
  idUserWeb: string;
  idPostulante: string;
  idEstudio: string;


  form: FormGroup = new FormGroup({
    modalidad: new FormControl(''),
    tipoEstudio: new FormControl(''),
    nombre: new FormControl(''),
    tipoCentro: new FormControl(''),
    tipoSituacion: new FormControl(''),
    tiempoEstudiado: new FormControl(''),
    tipoTiempo: new FormControl(''),
    promedioPonderado: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    graduado: new FormControl(''),
    fechaGrado: new FormControl(''),
    colegiatura: new FormControl(''),
    numeroColegiatura: new FormControl(''),
    fechaExpedicion: new FormControl('')
  });

  constructor(
    private estudioService: EstudioFormalService,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private datosPersonalService: DatosPersonalService
  ) { }

  ngOnInit(): void {
    console.log(this.idEstudio = this.route.snapshot.paramMap.get('exp'))
    this.idUserWeb = sessionStorage.getItem('ID-USER');
    this.idEstudio = this.route.snapshot.paramMap.get('exp');
    this.cargar(this.idEstudio);
    this.getIdPostulante();
    this.getTiposSituacion();
    this.getTiposTiempo();

  }

  getTiposSituacion(){
    this.menuService.getTiposSituacion().subscribe(data => {
      this.tiposSituacion = data
    });
  }

  getTiposTiempo(){
    this.menuService.getTiposTiempo().subscribe(data => {
      this.tiposTiempo = data
    });
  }

  cargar(id: string) {
    if (id != null) {
      this.estudioService.getEstudioFormalById(id)
        .pipe(
          catchError(error => {
            this.snackBar.open(error, null, {
              duration: 3000
            });
            return EMPTY;
          })
        )
        .subscribe(dato => {

          this.form = new FormGroup({
            'modalidad': new FormControl(dato.idDatoModalidadAcademica),
            'tipoEstudio': new FormControl(dato.idDatoNombreEstudio),
            'nombre': new FormControl(dato.nombreEstudioEspecifico),
            'tipoCentro': new FormControl(dato.idDatoCentroEstudio),
            'tipoSituacion': new FormControl(dato.idDatoSituacionEstudio),
            'tiempoEstudiado': new FormControl(dato.tiempoEstudiado),
            'tipoTiempo': new FormControl(dato.idDatoUnidadTiempo),
            'promedioPonderado': new FormControl(dato.promedioPonderado),
            'fechaInicio': new FormControl(dato.fechaInicio),
            'fechaFin': new FormControl(dato.fechaFin),
            'graduado': new FormControl(dato.indGraduado),
            'fechaGrado': new FormControl(dato.fechaGrado),
            'colegiatura': new FormControl(dato.indTieneColegiatura),
            'numeroColegiatura': new FormControl(dato.numeroColegiatura),
            'fechaExpedicion': new FormControl(dato.fechaExpedicion)
          });
        })
    }

  }

  getIdPostulante() {
    this.datosPersonalService.getDatosByIdUserWeb(this.idUserWeb)
      .subscribe(data => {
        this.idPostulante = data.idPostulante;
      })
  }

  grabar() {

    let exp = new EstudioFormal();
    console.log('idExp', this.idEstudio)
    if (this.idEstudio != null) {
      exp.idEstudioFormal = this.idEstudio;
    }

    exp.idPostulante = this.idPostulante;
    exp.idDatoModalidadAcademica = this.form.get('modalidad').value;
    exp.idDatoNombreEstudio = this.form.get('tipoEstudio').value;
    exp.nombreEstudioEspecifico = this.form.get('nombre').value;
    exp.idDatoCentroEstudio = this.form.get('tipoCentro').value;
    exp.idDatoSituacionEstudio = this.form.get('tipoSituacion').value;
    exp.tiempoEstudiado = this.form.get('tiempoEstudiado').value;
    exp.idDatoUnidadTiempo = this.form.get('tipoTiempo').value;
    exp.promedioPonderado = this.form.get('promedioPonderado').value;
    exp.fechaInicio = this.form.get('fechaInicio').value;
    exp.fechaFin = this.form.get('fechaFin').value;
    exp.indGraduado = this.form.get('graduado').value;
    exp.fechaGrado = this.form.get('fechaGrado').value;
    exp.indTieneColegiatura = this.form.get('colegiatura').value;
    exp.numeroColegiatura = this.form.get('numeroColegiatura').value;
    exp.fechaExpedicion = this.form.get('fechaExpedicion').value;

    this.estudioService.save(exp)
      .pipe(
        catchError(response => {
          console.log('response', response);
          this.snackBar.open(response, 'Cerrar', {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.clear();
        if (this.idEstudio == null) {
          this.snackBar.open('Se registro los datos del estudio formal', 'Cerrar', {
            duration: 3000
          });
        }
        else {
          this.snackBar.open('Se actualizo los datos del estudio formal', 'Cerrar', {
            duration: 3000
          });
        }

        this.router.navigate(['/pages/edu-formal']);
      });

  }

  cancelar() {
    this.router.navigate(['/pages/edu-formal']);
  }

  clear() {
    this.form.reset();
  }

}


