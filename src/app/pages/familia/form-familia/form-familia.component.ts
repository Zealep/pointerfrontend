import { Familia } from './../../../models/familia';
import { catchError } from 'rxjs/operators';
import { DatosPersonalService } from './../../../services/datos-personal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from './../../../services/menu.service';
import { FamiliaService } from './../../../services/familia.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Combo } from './../../../models/dto/combo';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-form-familia',
  templateUrl: './form-familia.component.html',
  styleUrls: ['./form-familia.component.css']
})
export class FormFamiliaComponent implements OnInit {

  tiposDocumento: Combo[] = []
  tiposGenero: Combo[] = []
  tiposParentesco: Combo[] = []
  tiposInstruccion: Combo[] = []
  pais: Combo[] = [];
  departamento: Combo[] = [];
  provincia: Combo[] = [];
  distrito: Combo[] = [];
  idUserWeb: string;
  idPostulante: string;
  idFamilia: string;


  form: FormGroup = new FormGroup({
    tipoDocumento: new FormControl(''),
    numeroDocumento: new FormControl(''),
    apellidoPaterno: new FormControl(''),
    apellidoMaterno: new FormControl(''),
    nombres: new FormControl(''),
    tipoGenero: new FormControl(''),
    tipoParentesco: new FormControl(''),
    tipoInstruccion: new FormControl(''),
    ocupacion: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    idDatoPais: new FormControl(''),
    idDpto: new FormControl(''),
    idProv: new FormControl(''),
    idDist: new FormControl(''),

  });

  constructor(
    private familiaService: FamiliaService,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private datosPersonalService: DatosPersonalService
  ) { }

  ngOnInit(): void {
    this.idUserWeb = sessionStorage.getItem('ID-USER');
    this.idFamilia = this.route.snapshot.paramMap.get('exp');
    this.cargar(this.idFamilia);
    this.getPais();
    this.getIdPostulante();
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
      this.familiaService.getFamiliaById(id)
        .pipe(
          catchError(error => {
            this.snackBar.open(error, null, {
              duration: 3000
            });
            return EMPTY;
          })
        )
        .subscribe(dato => {

          this.onSelectPais(dato.idDatoPaisNacimiento);
          this.onSelectDepartamento(dato.idDatoPaisNacimiento + dato.idDptoNacimiento);
          this.onSelectProvincia(dato.idDatoPaisNacimiento + dato.idDptoNacimiento + dato.idProvNacimiento);

          this.form = new FormGroup({
            'tipoDocumento': new FormControl(dato.idTipoDocumentoIdentidad),
            'numeroDocumento': new FormControl(dato.numeroDocumento),
            'apellidoPaterno': new FormControl(dato.apellidoPaterno),
            'apellidoMaterno': new FormControl(dato.apellidoMaterno),
            'nombres': new FormControl(dato.nombres),
            'tipoGenero': new FormControl(dato.idDatoGenero),
            'tipoParentesco': new FormControl(dato.idDatoTipoParentesco),
            'tipoInstruccion': new FormControl(dato.idDatoGradoInstruccion),
            'ocupacion': new FormControl(dato.ocupacion),
            'fechaNacimiento': new FormControl(dato.fechaNacimiento),
            'idDatoPais': new FormControl(dato.idDatoPaisNacimiento),
            'idDpto': new FormControl(dato.idDptoNacimiento),
            'idProv': new FormControl(dato.idProvNacimiento),
            'idDist': new FormControl(dato.idDistNacimiento),

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

    let exp = new Familia();

    if (this.idFamilia != null) {
      exp.idDatoFamilia = this.idFamilia;
    }

    exp.idPostulante = this.idPostulante;
    exp.idTipoDocumentoIdentidad = this.form.get('tipoDocumento').value;
    exp.numeroDocumento = this.form.get('numeroDocumento').value;
    exp.apellidoPaterno = this.form.get('apellidoPaterno').value;
    exp.apellidoMaterno = this.form.get('apellidoMaterno').value;
    exp.nombres = this.form.get('nombres').value;
    exp.idDatoGenero = this.form.get('tipoGenero').value;
    exp.idDatoTipoParentesco = this.form.get('tipoParentesco').value;
    exp.idDatoGradoInstruccion = this.form.get('tipoInstruccion').value;
    exp.ocupacion = this.form.get('ocupacion').value;
    exp.fechaNacimiento = this.form.get('fechaNacimiento').value;
    exp.idDatoPaisNacimiento = this.form.get('idDatoPais').value;
    exp.idDptoNacimiento = this.form.get('idDpto').value;
    exp.idProvNacimiento = this.form.get('idProv').value;
    exp.idDistNacimiento = this.form.get('idDist').value;


    this.familiaService.save(exp)
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
        if (this.idFamilia == null) {
          this.snackBar.open('Se registro los datos del familiar', 'Cerrar', {
            duration: 3000
          });
        }
        else {
          this.snackBar.open('Se actualizo los datos del familiar', 'Cerrar', {
            duration: 3000
          });
        }

        this.router.navigate(['/pages/familiares']);
      });

  }

  cancelar() {
    this.router.navigate(['/pages/familiares']);
  }

  clear() {
    this.form.reset();
  }

}
