import { TOKEN_NAME } from './../../var.constant';
import { catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    correo: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: Usuario) {

    this.usuarioService.login(user.correo,user.contraseña)
    .pipe(
      catchError(response => {
        console.log('error captcheado login',response);
      this.snackBar.open(response, 'Cerrar', {
        duration: 3000
      });
      // catch & replace
      return EMPTY;
      })
      )
    .subscribe(data =>{
      if(data){
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.router.navigate(['pages']);
      }
    });

  }
}
