import { DatoArchivo } from './../../../models/dato-archivo';
import { ExperienciaLaboral } from 'src/app/models/experiencia-laboral';
import { DatosPersonalService } from './../../../services/datos-personal.service';
import { catchError, concatMap } from 'rxjs/operators';
import { ExperienciaLaboralService } from './../../../services/experiencia-laboral.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from './../../../services/menu.service';
import { Combo } from './../../../models/dto/combo';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY } from 'rxjs';
import { UploadFilesComponent } from 'src/app/shared/components/upload-files/upload-files.component';
import { DatosPersonal } from 'src/app/models/datos-personal';

@Component({
  selector: 'app-form-experiencia-laboral',
  templateUrl: './form-experiencia-laboral.component.html',
  styleUrls: ['./form-experiencia-laboral.component.css']
})
export class FormExperienciaLaboralComponent implements OnInit {

  tiposEmpresa: Combo[] = []
  tiposActividad: Combo[] = []
  tiposDedicacion: Combo[] = []
  tiposContrato: Combo[] = []
  tiposRetiro: Combo[] = []
  pais: Combo[] = [];
  departamento: Combo[] = [];
  provincia: Combo[] = [];
  distrito: Combo[] = [];
  idUserWeb: string;
  postulante: DatosPersonal;
  idExperiencia: string;
  archivo = new DatoArchivo();
  idProceso = '00024';

  @ViewChild(UploadFilesComponent) upload:UploadFilesComponent


  form: FormGroup = new FormGroup({
    rucEmpresa: new FormControl(''),
    nombreEmpresa: new FormControl(''),
    tipoEmpresa: new FormControl(''),
    actividadEmpresa: new FormControl(''),
    idDatoPais: new FormControl(''),
    idDpto: new FormControl(''),
    idProv: new FormControl(''),
    idDist: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    fechaIngreso: new FormControl(''),
    fechaRetiro: new FormControl(''),
    trabajaActualmente: new FormControl(''),
    añosTrabajados: new FormControl(''),
    mesesTrabajados: new FormControl(''),
    diasTrabajados: new FormControl(''),
    cargo: new FormControl(''),
    area: new FormControl(''),
    dedicacion: new FormControl(''),
    motivoRetiro: new FormControl(''),
    manejoPersonal: new FormControl(''),
    salario: new FormControl(''),
    nombreJefe: new FormControl(''),
    cargoJefe: new FormControl(''),
    numeroContacto: new FormControl(''),
    funciones: new FormControl(''),
    numeroFolio: new FormControl('')
  });

  constructor(
    private experienciaService: ExperienciaLaboralService,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private datosPersonalService: DatosPersonalService
  ) { }

  ngOnInit(): void {
    console.log(this.idExperiencia = this.route.snapshot.paramMap.get('exp'))
    this.idUserWeb = sessionStorage.getItem('ID-USER');
    this.idExperiencia = this.route.snapshot.paramMap.get('exp');
    this.cargar(this.idExperiencia);
    this.getPais();
    this.getDatosPostulante();

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

  cargar(id:string) {
   if(id != null){
    this.experienciaService.getExperienciaById(id)
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
        this.onSelectDepartamento(dato.idDatoPais+dato.idDpto);
        this.onSelectProvincia(dato.idDatoPais+dato.idDpto+dato.idProv);

        this.form = new FormGroup({
          'rucEmpresa': new FormControl(dato.rucEmpresa),
          'nombreEmpresa': new FormControl(dato.rasonSocialEmpresa),
          'tipoEmpresa': new FormControl(dato.idDatoTipoEmpresa),
          'actividadEmpresa': new FormControl(dato.idTipoActividad),
          'idDatoPais': new FormControl(dato.idDatoPais),
          'idDpto': new FormControl(dato.idDpto),
          'idProv': new FormControl(dato.idProv),
          'idDist': new FormControl(dato.idDist),
          'direccion': new FormControl(dato.direccion),
          'telefono': new FormControl(dato.telefono),
          'fechaIngreso': new FormControl(dato.fechaIngreso),
          'fechaRetiro': new FormControl(dato.fechaRetiro),
          'trabajaActualmente': new FormControl(dato.indTrabajaActualmente),
          'añosTrabajados': new FormControl(dato.añoTrabajados),
          'mesesTrabajados': new FormControl(dato.mesesTrabajados),
          'diasTrabajados': new FormControl(dato.diasTrabajados),
          'cargo': new FormControl(dato.cargoDesempeñado),
          'area': new FormControl(dato.area),
          'dedicacion': new FormControl(dato.indDatoTipoDedicacion),
          'manejoPersonal': new FormControl(dato.indPersonalCargo),
          'salario': new FormControl(dato.sueldo),
          'nombreJefe': new FormControl(dato.nombreJefe),
          'cargoJefe': new FormControl(dato.cargoJefe),
          'numeroContacto': new FormControl(dato.numeroContactoJefe),
          'funciones': new FormControl(dato.funciones),
          'numeroFolio': new FormControl(dato.numeroFolio)
        });
      })
   }

  }

  getDatosPostulante(){
    this.datosPersonalService.getDatosByIdUserWeb(this.idUserWeb)
    .subscribe(data=>{
      this.postulante = data;
    })
  }

  grabar() {

    let exp = new ExperienciaLaboral();


    console.log('idExp',this.idExperiencia)
    if(this.idExperiencia!=null){
      exp.idExperienciaLaboral = this.idExperiencia;
    }

    exp.idPostulante = this.postulante.idPostulante;
    exp.rucEmpresa = this.form.get('rucEmpresa').value;
    exp.rasonSocialEmpresa = this.form.get('nombreEmpresa').value;
    exp.idDatoTipoEmpresa = this.form.get('tipoEmpresa').value;
    exp.idTipoActividad = this.form.get('actividadEmpresa').value;
    exp.idDatoPais = this.form.get('idDatoPais').value;
    exp.idDpto = this.form.get('idDpto').value;
    exp.idProv = this.form.get('idProv').value;
    exp.idDist = this.form.get('idDist').value;
    exp.direccion = this.form.get('direccion').value;
    exp.telefono = this.form.get('telefono').value;
    exp.fechaIngreso = this.form.get('fechaIngreso').value;
    exp.fechaRetiro = this.form.get('fechaRetiro').value;
    exp.indTrabajaActualmente = this.form.get('trabajaActualmente').value;
    exp.añoTrabajados = this.form.get('añosTrabajados').value;
    exp.mesesTrabajados = this.form.get('mesesTrabajados').value;
    exp.diasTrabajados = this.form.get('diasTrabajados').value;
    exp.cargoDesempeñado = this.form.get('cargo').value;
    exp.area = this.form.get('area').value;

    exp.indDatoTipoDedicacion = this.form.get('dedicacion').value;
    exp.indPersonalCargo = this.form.get('manejoPersonal').value;
    exp.sueldo = this.form.get('salario').value;
    exp.nombreJefe = this.form.get('nombreJefe').value;
    exp.cargoJefe = this.form.get('cargoJefe').value;
    exp.numeroContactoJefe = this.form.get('numeroContacto').value;
    exp.funciones = this.form.get('funciones').value;
    exp.numeroFolio = this.form.get('numeroFolio').value;


    this.experienciaService.save(exp)
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
        console.log('result',result)

        this.archivo.idCodigoRelacional = result.idEntity
        this.archivo.idProceso = '00025'
        this.archivo.idTipoDocumentoIdentidad = this.postulante.tipoDocumentosIdentidad.idTipoDocumentoIdentidad
        this.archivo.numeroDocumento= this.postulante.numeroDocumento
        this.upload.uploadFiles(this.archivo);

        this.clear();
        if(this.idExperiencia == null){

          this.snackBar.open('Se registro los datos de la experiencia laboral', 'Cerrar', {
            duration: 3000
          });
        }
        else{
          this.snackBar.open('Se actualizo los datos de la experiencia laboral', 'Cerrar', {
            duration: 3000
          });
        }
        this.router.navigate(['/pages/exp-laboral']);
      });


  }

  cancelar(){
    this.router.navigate(['/pages/exp-laboral']);
  }

  clear(){
    this.form.reset();
  }

}
