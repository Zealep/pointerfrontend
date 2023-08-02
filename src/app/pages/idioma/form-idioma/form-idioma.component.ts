import { DatosPersonal } from './../../../models/datos-personal';
import { DatoArchivo } from './../../../models/dato-archivo';
import { UploadFilesComponent } from 'src/app/shared/components/upload-files/upload-files.component';
import { catchError } from 'rxjs/operators';
import { DatosPersonalService } from './../../../services/datos-personal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from './../../../services/menu.service';
import { IdiomaService } from './../../../services/idioma.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Combo } from './../../../models/dto/combo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Idioma } from 'src/app/models/idioma';

@Component({
  selector: 'app-form-idioma',
  templateUrl: './form-idioma.component.html',
  styleUrls: ['./form-idioma.component.css']
})
export class FormIdiomaComponent implements OnInit {

  tiposNivel: Combo[] = []
  idUserWeb: string;
  idPostulante: string;
  idIdioma: string;
  idProceso = '00029';
  archivo = new DatoArchivo();
  postulante: DatosPersonal;
  @ViewChild(UploadFilesComponent) upload: UploadFilesComponent


  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    oral: new FormControl(''),
    escrito: new FormControl(''),
    lectura: new FormControl(''),

  });

  constructor(
    private idiomaService: IdiomaService,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private datosPersonalService: DatosPersonalService
  ) { }

  ngOnInit(): void {
    console.log(this.idIdioma = this.route.snapshot.paramMap.get('exp'))
    this.idUserWeb = sessionStorage.getItem('usuario');
    this.idIdioma = this.route.snapshot.paramMap.get('exp');
    this.cargar(this.idIdioma);
    this.getDatosPostulante();
    this.getIdPostulante();
    this.getTiposNiveles();

  }

  getDatosPostulante() {
    this.datosPersonalService.getDatosByIdUserWeb(this.idUserWeb)
      .subscribe(data => {
        this.postulante = data;
      })
  }

  getTiposNiveles() {
    this.menuService.getNiveles().subscribe(data => {
      this.tiposNivel = data
    });
  }

  cargar(id: string) {
    if (id != null) {
      this.idiomaService.getIdiomaById(id)
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
            'nombre': new FormControl(dato.nombreIdioma),
            'oral': new FormControl(dato.idDatoNivelHablaIdioma),
            'escrito': new FormControl(dato.idDatoNivelEscribeIdioma),
            'lectura': new FormControl(dato.idDatoNivelLeeIdioma)
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

    let exp = new Idioma();

    if (this.idIdioma != null) {
      exp.idIdioma = this.idIdioma;
    }

    exp.idPostulante = this.idPostulante;
    exp.nombreIdioma = this.form.get('nombre').value;
    exp.idDatoNivelEscribeIdioma = this.form.get('escrito').value;
    exp.idDatoNivelHablaIdioma = this.form.get('oral').value;
    exp.idDatoNivelLeeIdioma = this.form.get('lectura').value;

    console.log(exp);

    this.idiomaService.save(exp)
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
        this.archivo.idCodigoRelacional = result.idEntity
        this.archivo.idProceso = this.idProceso
        this.archivo.idTipoDocumentoIdentidad = this.postulante.tipoDocumentosIdentidad.idTipoDocumentoIdentidad
        this.archivo.numeroDocumento = this.postulante.numeroDocumento
        this.upload.uploadFiles(this.archivo);
        if (this.idIdioma == null) {
          this.snackBar.open('Se registro los datos del idioma', 'Cerrar', {
            duration: 3000
          });
        }
        else {
          this.snackBar.open('Se actualizo los datos del idioma', 'Cerrar', {
            duration: 3000
          });
        }

        this.router.navigate(['/pages/idiomas']);
      });

  }

  cancelar() {
    this.router.navigate(['/pages/idiomas']);
  }

  clear() {
    this.form.reset();
  }

}


