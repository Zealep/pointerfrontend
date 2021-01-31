import { DiscapacidadDTO } from './../../models/dto/discapacidad-dto';
import { DatoArchivo } from './../../models/dato-archivo';
import { UploadFilesComponent } from './../../shared/components/upload-files/upload-files.component';
import { AreaInteresDTO } from './../../models/dto/area-interes-dto';
import { DiscapacidadService } from './../../services/discapacidad.service';
import { AreaInteresService } from './../../services/area-interes.service';
import { AreaInteres } from './../../models/area-interes';
import { MenuService } from './../../services/menu.service';
import { Combo } from './../../models/dto/combo';
import { DatosPersonalService } from './../../services/datos-personal.service';
import { catchError, concatMap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './../../services/usuario.service';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocumento } from 'src/app/models/TipoDocumento';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { DatosPersonal } from 'src/app/models/datos-personal';
import { Discapacidad } from 'src/app/models/discapacidad';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  tiposDocumento: TipoDocumento[] = []
  sexo: Combo[] = [];
  estadoCivil: Combo[] = [];
  pais: Combo[] = [];
  departamentoNacimiento: Combo[] = [];
  provinciaNacimiento: Combo[] = [];
  distritoNacimiento: Combo[] = [];
  departamentoResidencia: Combo[] = [];
  provinciaResidencia: Combo[] = [];
  distritoResidencia: Combo[] = [];
  idUserWeb: string;
  areas: Combo[] = [];
  areasPostulante: AreaInteresDTO[]=[];
  displayedColumns: string[] = ['nombre','acciones'];
  idProceso = '00024';
  archivo = new DatoArchivo();
  postulante = new DatosPersonal();

  discapacidades: Combo[] = [];
  tipoDiscapacidad: string;
  porcentageDiscapacidad: number;
  displayedColumnsDisca: string[] = ['discapacidad','porcentaje','accionesDisca'];
  discapacidadPostulante: DiscapacidadDTO[]=[];

  @ViewChild(UploadFilesComponent) upload:UploadFilesComponent

  dataAreas: MatTableDataSource<AreaInteresDTO>;
  dataDiscapacidad: MatTableDataSource<DiscapacidadDTO>;


  tipoVia: Combo[] = [];
  tipoZona: Combo[] = [];
  motivoEntero: Combo[] = [];
  cargo: Combo[] = [];

  idPostulante: string;

  form: FormGroup = new FormGroup({
    tipoDocumento: new FormControl(''),
    numeroDocumento: new FormControl(''),
    apellidoPaterno: new FormControl(''),
    apellidoMaterno: new FormControl(''),
    nombres: new FormControl(''),
    idDatoGenero: new FormControl(''),
    idDatoEstadoCivil: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    idDatoPaisNacimiento: new FormControl(''),
    idDptoNacimiento: new FormControl(''),
    idProvNacimiento: new FormControl(''),
    idDistNacimiento: new FormControl(''),
    idDatoPaisResidencia: new FormControl(''),
    idDptoResidencia: new FormControl(''),
    idProvResidencia: new FormControl(''),
    idDisResidencia: new FormControl(''),
    iddatoSunatTipoVia: new FormControl(''),
    nombreVia: new FormControl(''),
    numeroVia: new FormControl(''),
    interior: new FormControl(''),
    iddatoSunatTipoZona: new FormControl(''),
    nombreZona: new FormControl(''),
    referencia: new FormControl(''),
    telefonoFijo: new FormControl(''),
    telefonoMovil: new FormControl(''),
    indAceptoDatosPersonales: new FormControl(''),
    indDispViajarInterior: new FormControl(''),
    indDispViajarExterior: new FormControl(''),
    indDispInmediata: new FormControl(''),
    tiempoDisponibilidad: new FormControl(''),
    idCargo: new FormControl(''),
    expectativaSalarial: new FormControl(''),
    idMedioInformativo: new FormControl(''),
    indTieneDiscapacidad: new FormControl(''),
    numeroConadis: new FormControl('')
  });


  constructor(private tipoDocumentoService: TipoDocumentoService,
    private menuService: MenuService,
    private usuarioService: UsuarioService,
    private datosPersonalService: DatosPersonalService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private areaInteresService: AreaInteresService,
    private discapacidadService: DiscapacidadService) { }

  ngOnInit(): void {
    this.idUserWeb = sessionStorage.getItem('ID-USER');
    this.getIdPostulante();
    this.getTiposDocumentos();
    this.getGeneros();
    this.getEstadoCivil();
    this.getPais();
    this.getTipoVia();
    this.getTipoZona();
    this.getMotivoEntero();
    this.getCargo();
    this.getAreasByPostulante();
    this.getDiscapacidadByPostulante();
    this.cargar();
    this.getAreas();
    this.getDatosPostulante();
    this.getDiscapacidades();
  }

  getDatosPostulante(){
    this.datosPersonalService.getDatosByIdUserWeb(this.idUserWeb)
    .subscribe(data=>{
      this.postulante = data;
    })
  }

  onSelectPaisNacimiento(dato: string) {
    this.getDepartamentoNacimiento(dato);
  }

  onSelectDepartamentoNacimiento(dato: string) {
    this.getProvinciaNacimiento(dato);
  }

  onSelectProvinciaNacimiento(dato: string) {
    this.getDistritoNacimiento(dato);
  }

  onSelectPaisResidencia(dato: string) {
    this.getDepartamentoResidencia(dato);
  }

  onSelectDepartamentoResidencia(dato: string) {
    this.getProvinciaResidencia(dato);
  }

  onSelectProvinciaResidencia(dato: string) {
    this.getDistritoResidencia(dato);
  }

  refreshDataSource(){
    this.dataAreas = new MatTableDataSource(this.areasPostulante);

  }



  getTiposDocumentos() {
    this.tipoDocumentoService.getUsers().subscribe(data => {
      this.tiposDocumento = data
    });
  }

  getDiscapacidades() {
    this.menuService.getDiscapacidades().subscribe(data => {
      this.discapacidades = data
    });
  }

  getGeneros() {
    this.menuService.getGeneros().subscribe(data => {
      this.sexo = data
    });
  }

  getEstadoCivil() {
    this.menuService.getEstadoCivil().subscribe(data => {
      this.estadoCivil = data
    });
  }

  getPais() {
    this.menuService.getPais().subscribe(data => {
      this.pais = data
    });
  }

  getDepartamentoNacimiento(dato: string) {
    this.menuService.getDepartamento(dato).subscribe(data => {
      this.departamentoNacimiento = data
    });
  }

  getProvinciaNacimiento(dato: string) {
    let pais = this.form.get('idDatoPaisNacimiento').value;
    this.menuService.getProvincia(pais + dato).subscribe(data => {
      this.provinciaNacimiento = data
    });
  }

  getDistritoNacimiento(dato: string) {
    let pais = this.form.get('idDatoPaisNacimiento').value;
    let depa = this.form.get('idDptoNacimiento').value;
    this.menuService.getDistrito(pais + depa + dato).subscribe(data => {
      this.distritoNacimiento = data
    });
  }

  getDepartamentoResidencia(dato: string) {
    this.menuService.getDepartamento(dato).subscribe(data => {
      this.departamentoResidencia = data
    });
  }

  getProvinciaResidencia(dato: string) {
    let pais = this.form.get('idDatoPaisResidencia').value;
    this.menuService.getProvincia(pais + dato).subscribe(data => {
      this.provinciaResidencia = data
    });
  }

  getDistritoResidencia(dato: string) {
    let pais = this.form.get('idDatoPaisResidencia').value;
    let depa = this.form.get('idDptoResidencia').value;
    this.menuService.getDistrito(pais + depa + dato).subscribe(data => {
      this.distritoResidencia = data
    });
  }

  getTipoVia() {
    this.menuService.getTipoVia().subscribe(data => {
      this.tipoVia = data
    });
  }

  getTipoZona() {
    this.menuService.getTipoZona().subscribe(data => {
      this.tipoZona = data
    });
  }

  getMotivoEntero() {
    this.menuService.getMotivoEntero().subscribe(data => {
      this.motivoEntero = data
    });
  }

  getCargo() {
    this.menuService.getCargo().subscribe(data => {
      this.cargo = data
    });
  }

  getAreas(){
    this.menuService.getAreas().subscribe(data => {
      this.areas = data
    });
  }

  getAreasByPostulante(){
    this.areaInteresService.getAreasDTOByPostulante(this.idUserWeb)
    .subscribe(datos =>{
       this.dataAreas = new MatTableDataSource(datos);
        this.areasPostulante = datos;
    })
  }

  getDiscapacidadByPostulante(){
    this.discapacidadService.getDiscapacidadesDTOByPostulante(this.idUserWeb)
    .subscribe(datos =>{
      this.dataDiscapacidad = new MatTableDataSource(datos);
        this.discapacidadPostulante = datos;
    })
  }

  borrarArea(id:string){
    this.areaInteresService.delete(id)
    .subscribe(x =>{
      this.getAreasByPostulante();
  })
}

borrarDiscapacidad(id:string){
  this.discapacidadService.delete(id)
  .subscribe(x =>{
    this.getDiscapacidadByPostulante();
})
}

agregarDiscapacidad(){
  if(this.tipoDiscapacidad == null || this.porcentageDiscapacidad == null){
    alert("Ingresa todos los datos de la discapacidad")
  }
  let  d = new Discapacidad();
  d.idPostulante = this.idUserWeb;
  d.idTipoDiscapacidad = this.tipoDiscapacidad;
  d.porcentajeDiscapacidad = this.porcentageDiscapacidad;
  this.discapacidadService.save(d).subscribe(x=>{
    this.getDiscapacidadByPostulante();
  })
}

  cargar() {

    this.datosPersonalService.getDatosByIdUserWeb(this.idUserWeb)
      .pipe(
        catchError(error => {
          this.snackBar.open(error, null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(dato => {

        this.onSelectPaisNacimiento(dato.idDatoPaisNacimiento);
        this.onSelectDepartamentoNacimiento(dato.idDatoPaisNacimiento+dato.idDptoNacimiento);
        this.onSelectProvinciaNacimiento(dato.idDatoPaisNacimiento+dato.idDptoNacimiento+dato.idProvNacimiento);

        this.onSelectPaisResidencia(dato.idDatoPaisResidencia);
        this.onSelectDepartamentoResidencia(dato.idDatoPaisResidencia+dato.idDptoResidencia);
        this.onSelectProvinciaResidencia(dato.idDatoPaisResidencia+dato.idDptoResidencia+dato.idProvResidencia);


        this.form = new FormGroup({
          'tipoDocumento': new FormControl(dato.tipoDocumentosIdentidad.idTipoDocumentoIdentidad),
          'numeroDocumento': new FormControl(dato.numeroDocumento),
          'apellidoPaterno': new FormControl(dato.apellidoPaterno),
          'apellidoMaterno': new FormControl(dato.apellidoMaterno),
          'nombres': new FormControl(dato.nombres),
          'idDatoGenero': new FormControl(dato.idDatoGenero),
          'idDatoEstadoCivil': new FormControl(dato.idDatoEstadoCivil),
          'fechaNacimiento': new FormControl(dato.fechaNacimiento),
          'idDatoPaisNacimiento': new FormControl(dato.idDatoPaisNacimiento),
          'idDptoNacimiento': new FormControl(dato.idDptoNacimiento),
          'idProvNacimiento': new FormControl(dato.idProvNacimiento),
          'idDistNacimiento': new FormControl(dato.idDistNacimiento),
          'idDatoPaisResidencia': new FormControl(dato.idDatoPaisResidencia),
          'idDptoResidencia': new FormControl(dato.idDptoResidencia),
          'idProvResidencia': new FormControl(dato.idProvResidencia),
          'idDisResidencia': new FormControl(dato.idDisResidencia),
          'iddatoSunatTipoVia': new FormControl(dato.iddatoSunatTipoVia),
          'nombreVia': new FormControl(dato.nombreVia),
          'numeroVia': new FormControl(dato.numeroVia),
          'interior': new FormControl(dato.interior),
          'iddatoSunatTipoZona': new FormControl(dato.iddatoSunatTipoZona),
          'nombreZona': new FormControl(dato.nombreZona),
          'referencia': new FormControl(dato.referencia),
          'telefonoFijo': new FormControl(dato.telefonoFijo),
          'telefonoMovil': new FormControl(dato.telefonoMovil),
          'indAceptoDatosPersonales': new FormControl(dato.indAceptoDatosPersonales),
          'indDispViajarInterior': new FormControl(dato.indDispViajarInterior),
          'indDispViajarExterior': new FormControl(dato.indDispViajarExterior),
          'indDispInmediata': new FormControl(dato.indDispInmediata),
          'tiempoDisponibilidad': new FormControl(dato.tiempoDisponibilidad),
          'idCargo': new FormControl(dato.idCargo),
          'expectativaSalarial': new FormControl(dato.expectativaSalarial),
          'idMedioInformativo': new FormControl(dato.idMedioInformativo),
          'indTieneDiscapacidad': new FormControl(dato.indTieneDiscapacidad),
          'numeroConadis': new FormControl(dato.numeroConadis)        });
      })
  }
  getIdPostulante(){
    this.datosPersonalService.getDatosByIdUserWeb(this.idUserWeb)
    .subscribe(data=>{
      this.idPostulante = data.idPostulante;
    })
  }

  grabar() {

    let datos = new DatosPersonal();
    let tipoDocumento = new TipoDocumento();

    datos.idPostulante = this.idPostulante;
    datos.idUsuarioWeb = this.idUserWeb;
    tipoDocumento.idTipoDocumentoIdentidad = this.form.get('tipoDocumento').value;
    datos.tipoDocumentosIdentidad = tipoDocumento;
    datos.numeroDocumento = this.form.get('numeroDocumento').value;
    datos.apellidoPaterno = this.form.get('apellidoPaterno').value;
    datos.apellidoMaterno = this.form.get('apellidoMaterno').value;
    datos.nombres = this.form.get('nombres').value;
    datos.idDatoGenero = this.form.get('idDatoGenero').value;
    datos.idDatoEstadoCivil = this.form.get('idDatoEstadoCivil').value;
    datos.fechaNacimiento = this.form.get('fechaNacimiento').value;
    datos.idDatoPaisNacimiento = this.form.get('idDatoPaisNacimiento').value;
    datos.idDptoNacimiento = this.form.get('idDptoNacimiento').value;
    datos.idProvNacimiento = this.form.get('idProvNacimiento').value;
    datos.idDistNacimiento = this.form.get('idDistNacimiento').value;
    datos.idDatoPaisResidencia = this.form.get('idDatoPaisResidencia').value;
    datos.idDptoResidencia = this.form.get('idDptoResidencia').value;
    datos.idProvResidencia = this.form.get('idProvResidencia').value;
    datos.idDisResidencia = this.form.get('idDisResidencia').value;
    datos.iddatoSunatTipoVia = this.form.get('iddatoSunatTipoVia').value;
    datos.nombreVia = this.form.get('nombreVia').value;
    datos.numeroVia = this.form.get('numeroVia').value;
    datos.interior = this.form.get('interior').value;
    datos.iddatoSunatTipoZona = this.form.get('iddatoSunatTipoZona').value;
    datos.nombreZona = this.form.get('nombreZona').value;
    datos.referencia = this.form.get('referencia').value;
    datos.telefonoFijo = this.form.get('telefonoFijo').value;
    datos.telefonoMovil = this.form.get('telefonoMovil').value;
    datos.indAceptoDatosPersonales = this.form.get('indAceptoDatosPersonales').value;
    datos.indDispViajarInterior = this.form.get('indDispViajarInterior').value;
    datos.indDispViajarExterior = this.form.get('indDispViajarExterior').value;
    datos.indDispInmediata = this.form.get('indDispInmediata').value;
    datos.tiempoDisponibilidad = this.form.get('tiempoDisponibilidad').value;
    datos.idCargo = this.form.get('idCargo').value;
    datos.expectativaSalarial = this.form.get('expectativaSalarial').value;
    datos.idMedioInformativo = this.form.get('idMedioInformativo').value;
    datos.indTieneDiscapacidad = this.form.get('indTieneDiscapacidad').value;
    datos.numeroConadis = this.form.get('numeroConadis').value;

    this.datosPersonalService.save(datos)
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
        this.archivo.idCodigoRelacional = result.idEntity
        this.archivo.idProceso = this.idProceso
        this.archivo.idTipoDocumentoIdentidad = this.postulante.tipoDocumentosIdentidad.idTipoDocumentoIdentidad
        this.archivo.numeroDocumento= this.postulante.numeroDocumento
        this.upload.uploadFiles(this.archivo);

        this.snackBar.open('Los datos personales del postulante fueron actualizados', 'Cerrar', {
          duration: 3000

        });
        this.router.navigate(['/pages/datos-personales']);

      });


  }

  select(a){
    let area = new AreaInteres();
    area.idPostulante = this.idPostulante;
    area.idAreaAspira = a;
    this.areaInteresService.save(area)
    .subscribe(x =>{
      this.getAreasByPostulante();
      this.refreshDataSource();
    })

  }

  loadAreas(){

  }
  clear() {
    this.form.reset();
  }

  cancelar() {
    this.router.navigate(['/pages']);


  }


}
