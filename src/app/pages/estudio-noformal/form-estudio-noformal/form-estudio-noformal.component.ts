import { EstudioNoFormal } from './../../../models/estudio-noformal';
import { catchError } from 'rxjs/operators';
import { DatosPersonalService } from './../../../services/datos-personal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from './../../../services/menu.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Combo } from './../../../models/dto/combo';
import { Component, OnInit } from '@angular/core';
import { EstudioNoFormalService } from 'src/app/services/estudio-noformal.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-form-estudio-formal',
  templateUrl: './form-estudio-noformal.component.html',
  styleUrls: ['./form-estudio-noformal.component.css']
})
export class FormEstudioNoFormalComponent implements OnInit {

  tiposModalidad: Combo[] = []
  tiposEstudio: Combo[] = []
  tiposTiempo: Combo[] = []
  tiposCentroEstudio: Combo[] = []
  pais: Combo[] = [];
  departamento: Combo[] = [];
  provincia: Combo[] = [];
  distrito: Combo[] = [];
  idUserWeb: string;
  idPostulante: string;
  idEstudio: string;


  form: FormGroup = new FormGroup({
    modalidad: new FormControl(''),
    tipoEstudio: new FormControl(''),
    nombre: new FormControl(''),
    tipoCentroEstudio: new FormControl(''),
    nombreCentro: new FormControl(''),
    idDatoPais: new FormControl(''),
    idDpto: new FormControl(''),
    idProv: new FormControl(''),
    idDist: new FormControl(''),
    tiempoEstudiado: new FormControl(''),
    tipoTiempo: new FormControl(''),
    promedioPonderado: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    numeroFolio: new FormControl('')
  });

  constructor(
    private estudioService: EstudioNoFormalService,
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
    this.getPais();
    this.getIdPostulante();
    this.getTiposTiempo();
  }

  getTiposTiempo(){
    this.menuService.getTiposTiempo().subscribe(data => {
      this.tiposTiempo = data
    });
  }
  onSelectPais(dato: string) {
    this.getDepartamento(dato);
  }

  onSelectDepartamento(dato: string) {
    this.getProvincia(dato);
  }

  onSelectProvincia(dato: string) {
    this.getDistrito(dato);
  }

  getPais() {
    this.menuService.getPais().subscribe(data => {
      this.pais = data
    });
  }

  getDepartamento(dato: string) {
    this.menuService.getDepartamento(dato).subscribe(data => {
      this.departamento = data
    });
  }

  getProvincia(dato: string) {
    let pais = this.form.get('idDatoPais').value;
    this.menuService.getProvincia(pais + dato).subscribe(data => {
      this.provincia = data
    });
  }

  getDistrito(dato: string) {
    let pais = this.form.get('idDatoPais').value;
    let depa = this.form.get('idDpto').value;
    this.menuService.getDistrito(pais + depa + dato).subscribe(data => {
      this.distrito = data
    });
  }

  cargar(id: string) {
    if (id != null) {
      this.estudioService.getEstudioNoFormalById(id)
        .pipe(
          catchError(error => {
            this.snackBar.open(error, null, {
              duration: 3000
            });
            return EMPTY;
          })
        )
        .subscribe(dato => {

          this.onSelectPais(dato.idDatoPais);
          this.onSelectDepartamento(dato.idDatoPais + dato.idDpto);
          this.onSelectProvincia(dato.idDatoPais + dato.idDpto + dato.idProv);

          this.form = new FormGroup({
            'modalidad': new FormControl(dato.idDatoModalidadAcademica),
            'tipoEstudio': new FormControl(dato.idDatoNombreEstudio),
            'nombre': new FormControl(dato.nombreEstudioEspecifico),
            'tipoCentroEstudio': new FormControl(dato.idDatoCentroEstudio),
            'nombreCentro': new FormControl(dato.nombreCentroEstudio),
            'idDatoPais': new FormControl(dato.idDatoPais),
            'idDpto': new FormControl(dato.idDpto),
            'idProv': new FormControl(dato.idProv),
            'idDist': new FormControl(dato.idDist),
            'tiempoEstudiado': new FormControl(dato.tiempoEstudiado),
            'tipoTiempo': new FormControl(dato.idDatoUnidadTiempo),
            'promedioPonderado': new FormControl(dato.promedioPonderado),
            'fechaInicio': new FormControl(dato.fechaInicio),
            'fechaFin': new FormControl(dato.fechaFin),
            'numeroFolio': new FormControl(dato.numeroFolio)
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

    let exp = new EstudioNoFormal();
    console.log('idExp', this.idEstudio)
    if (this.idEstudio != null) {
      exp.idEstudioNoFormal = this.idEstudio;
    }

    exp.idPostulante = this.idPostulante;
    exp.idDatoModalidadAcademica = this.form.get('modalidad').value;
    exp.idDatoNombreEstudio = this.form.get('tipoEstudio').value;
    exp.nombreEstudioEspecifico = this.form.get('nombre').value;
    exp.idDatoCentroEstudio = this.form.get('tipoCentroEstudio').value;
    exp.nombreCentroEstudio = this.form.get('nombreCentro').value;
    exp.idDatoPais = this.form.get('idDatoPais').value;
    exp.idDpto = this.form.get('idDpto').value;
    exp.idProv = this.form.get('idProv').value;
    exp.idDist = this.form.get('idDist').value;
    exp.tiempoEstudiado = this.form.get('tiempoEstudiado').value;
    exp.idDatoUnidadTiempo = this.form.get('tipoTiempo').value;
    exp.promedioPonderado = this.form.get('promedioPonderado').value;
    exp.fechaInicio = this.form.get('fechaInicio').value;
    exp.fechaFin = this.form.get('fechaFin').value;
    exp.numeroFolio = this.form.get('numeroFolio').value;

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
          this.snackBar.open('Se registro los datos del estudio no formal', 'Cerrar', {
            duration: 3000
          });
        }
        else {
          this.snackBar.open('Se actualizo los datos del estudio no formal', 'Cerrar', {
            duration: 3000
          });
        }

        this.router.navigate(['/pages/edu-noformal']);
      });

  }

  cancelar() {
    this.router.navigate(['/pages/edu-noformal']);
  }

  clear() {
    this.form.reset();
  }

}

