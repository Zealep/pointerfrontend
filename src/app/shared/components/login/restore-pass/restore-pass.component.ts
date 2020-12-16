import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './../../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-restore-pass',
  templateUrl: './restore-pass.component.html',
  styleUrls: ['./restore-pass.component.css']
})
export class RestorePassComponent implements OnInit {

  form: FormGroup = new FormGroup({
    correo: new FormControl('')
  });

  constructor(private usuarioService:UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router) {

    }

  ngOnInit(): void {
  }

  enviar(){
    let correo = this.form.get('correo').value;
    this.usuarioService.sendEmail(correo)
    .pipe(
      catchError(response => {
      this.snackBar.open(response.error.message, 'Cerrar', {
        duration: 3000
      });
      return EMPTY;
      })
      )
    .subscribe(data => {
      this.snackBar.open('La constraseña fue enviado al correo', 'Cerrar', {
        duration: 3000
      });
    });
  }

  cancelar(){
    this.router.navigate(['/login']);
  }

}
