import { FormGroup, FormControl } from '@angular/forms';
import { TipoDocumentoService } from './../../../../services/tipo-documento.service';
import { UsuarioService } from './../../../../services/usuario.service';
import { TipoDocumento } from './../../../../models/TipoDocumento';
import { Component, OnInit } from '@angular/core';

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

  constructor(private tipoDocumentoService: TipoDocumentoService) { }

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  getTiposDocumentos(){
    this.tipoDocumentoService.getUsers().subscribe(data =>{
      this.tiposDocumento = data
    });
  }

}
