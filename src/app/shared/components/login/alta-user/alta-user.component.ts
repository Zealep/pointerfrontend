import { catchError } from 'rxjs/operators';
import { Usuario } from './../../../../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TipoDocumentoService } from './../../../../services/tipo-documento.service';
import { UsuarioService } from './../../../../services/usuario.service';
import { TipoDocumento } from './../../../../models/TipoDocumento';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-alta-user',
  templateUrl: './alta-user.component.html',
  styleUrls: ['./alta-user.component.css']
})
export class AltaUserComponent implements OnInit {

  tiposDocumento: TipoDocumento[] = [];
  idUsuario:number;

  form: FormGroup = new FormGroup({
    apellidoPaterno: new FormControl(''),
    apellidoMaterno: new FormControl(''),
    nombres: new FormControl(''),
    tipoDocumento: new FormControl(''),
    numeroDocumento: new FormControl(''),
    correo: new FormControl(''),
    contraseña: new FormControl('')
  });

  constructor(private tipoDocumentoService: TipoDocumentoService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  getTiposDocumentos(){
    this.tipoDocumentoService.getUsers().subscribe(data =>{
      this.tiposDocumento = data
    });
  }

  grabar(){

    let usuario = new Usuario();
    let tipoDocumento = new TipoDocumento();

    tipoDocumento.idTipoDocumentoIdentidad = this.form.get('tipoDocumento').value;
    usuario.tipoDocumentosIdentidad = tipoDocumento;
    usuario.apellidoPaterno = this.form.get('apellidoPaterno').value;
    usuario.apellidoMaterno = this.form.get('apellidoMaterno').value;
    usuario.nombres = this.form.get('nombres').value;
    usuario.numeroDocumento = this.form.get('numeroDocumento').value;
    usuario.correo = this.form.get('correo').value;
    usuario.contraseña = this.form.get('contraseña').value;

    this.usuarioService.save(usuario)
    .pipe(
      catchError(response => {
        console.log('response',response);
      this.snackBar.open(response, 'Cerrar', {
        duration: 3000
      });
      return EMPTY;
      })
      )
      .subscribe(result => {
          this.clear();
          this.snackBar.open('El postulante fue registrado', 'Cerrar', {
            duration: 3000
          });

      });
   }
   clear(){
    this.form.reset();
   }

  cancelar(){
    this.router.navigate(['/login']);
  }

}
